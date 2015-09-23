<?php
require '.././libs/Slim/Slim.php';
require_once 'dbHelper.php';


\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
require ('SlimCors.middleware.php');
$app->add(new \CorsSlim\CorsSlim());

$app = \Slim\Slim::getInstance();
$db = new dbHelper();

/**
 * Database Helper Function templates
 */
/*
select(table name, where clause as associative array)
insert(table name, data as associative array, mandatory column names as array)
update(table name, column names as associative array, where clause as associative array, required columns as array)
delete(table name, where clause as array)
*/


// Products
$app->get('/products', function() {
    global $db;
    $rows = $db->select("products","id,sku,name,description,price,mrp,stock,image,packing,status",array());
    echoResponse(200, $rows);
});

$app->get('/login2', function() {
    global $db;
    $rows = $db->select("products","id,sku,name,description,price,mrp,stock,image,packing,status",array());
    echoResponse(200, $rows);
});

$app->post('/products', function() use ($app) {
    $data = json_decode($app->request->getBody());
    $mandatory = array('name');
    global $db;
    $rows = $db->insert("products", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Product added successfully.";
    echoResponse(200, $rows);
});

$app->put('/products/:id', function($id) use ($app) {
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("products", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Product information updated successfully.";
    echoResponse(200, $rows);
});

$app->delete('/products/:id', function($id) {
    global $db;
    $rows = $db->delete("products", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Product removed successfully.";
    echoResponse(200, $rows);
});

$app->get('/session', function() {
    global $db;
    $session = $db->getSession();
    $response["uid"] = $session['uid'];
    $response["email"] = $session['email'];
    $response["name"] = $session['name'];
    echoResponse(200, $session);
});

$app->post('/login', function() use ($app) {
  require_once 'passwordHash.php';
  global $db;
  $r = json_decode($app->request->getBody());
  verifyRequiredParams(array('email', 'password'),$r->customer);
  $response = array();
  $password = $r->customer->password;
  $email = $r->customer->email;
  $user = $db->getOneRecord("select uid,name,password,email,created from customers where phone='$email' or email='$email'");
  if ($user != NULL) {
    if(passwordHash::check_password($user['password'],$password)){
      $response['status'] = "success";
      $response['message'] = 'Logged in successfully.';
      $response['name'] = $user['name'];
      $response['uid'] = $user['uid'];
      $response['email'] = $user['email'];
      $response['createdAt'] = $user['created'];
      if (!isset($_SESSION)) {
        session_start();
      }
      $_SESSION['uid'] = $user['uid'];
      $_SESSION['email'] = $email;
      $_SESSION['name'] = $user['name'];
    } else {
      $response['status'] = "error";
      $response['message'] = 'Login failed. Incorrect credentials';
    }
  }else {
    $response['status'] = "error";
    $response['message'] = 'No such user is registered';
  }
  echoResponse(200, $response);
});

function verifyRequiredParams($required_fields,$request_params) {
    $error = false;
    $error_fields = "";
    foreach ($required_fields as $field) {
        if (!isset($request_params->$field) || strlen(trim($request_params->$field)) <= 0) {
            $error = true;
            $error_fields .= $field . ', ';
        }
    }

    if ($error) {
        // Required field(s) are missing or empty
        // echo error json and stop the app
        $response = array();
        $app = \Slim\Slim::getInstance();
        $response["status"] = "error";
        $response["message"] = 'Required field(s) ' . substr($error_fields, 0, -2) . ' is missing or empty';
        echoResponse(200, $response);
        $app->stop();
    }
}

function echoResponse($status_code, $response) {
    global $app;
    $app->status($status_code);
    $app->contentType('application/json');
    echo json_encode($response,JSON_NUMERIC_CHECK);
}

$app->run();
?>
