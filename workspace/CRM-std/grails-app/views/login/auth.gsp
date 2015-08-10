<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>CRM</title>

    <!-- Bootstrap Core CSS -->
    <link rel="stylesheet" type="text/css" href="${resource(dir: 'css', file: 'bootstrap.min.css')}" />

    <!-- MetisMenu CSS   
    <link rel="stylesheet" type="text/css" href="${resource(dir: 'css', file: 'metisMenu.min.css')}" />
	-->  
    <!-- Custom CSS     
    <link rel="stylesheet" type="text/css" href="${resource(dir: 'css', file: 'sb-admin-2.css')}" />
	-->
    <!-- Custom Fonts -->
    <link rel="stylesheet" type="text/css" href="${resource(dir: 'css', file: 'font-awesome.min.css')}" />

	<link rel="stylesheet" type="text/css" href="${resource(dir: 'css', file: 'login.css')}" />

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>
		
	<!--<form action='${postUrl}' method='POST' id='loginForm' class='cssform' autocomplete='off'>	
     Top content -->
        <div class="top-content">
        	
            <div class="inner-bg">
                <div class="container">               
                    <div class="row">
                        <div class="col-sm-6 col-sm-offset-3 form-box">
                        	<div class="form-top">
                        		<div class="form-top-left">
                        			<h3>Login</h3>
                            		<p>Enter your username and password to log on:</p>
                        		</div>
                        		<div class="form-top-right">
                        			<i class="fa fa-lock"></i>
                        		</div>
                            </div>
                            <div class="form-bottom">
			                    <form action='${postUrl}' method='POST' id='loginForm' role="form" class="login-form">
			                    	<div class="form-group">
			                    		<label class="sr-only" for="form-username">Username</label>
			                        	<input type="text" name="j_username" placeholder="Username..." class="form-control" id="form-username">
			                        </div>
			                        <div class="form-group">
			                        	<label class="sr-only" for="form-password">Password</label>
			                        	<input type="password" name="j_password" placeholder="Password..." class="form-password form-control" id="form-password">
			                        </div>
			                        <button type="submit" class="btn">Sign in!</button>
			                    </form>
		                    </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>            
        </div>
    </form>

    <!-- jQuery -->
    <script type="text/javascript" src="${resource(dir: 'js', file: 'jquery.js')}"></script>

    <!-- Bootstrap Core JavaScript -->
    <script type="text/javascript" src="${resource(dir: 'js', file: 'bootstrap.min.js')}"></script>

    <!-- Metis Menu Plugin JavaScript     
    <script type="text/javascript" src="${resource(dir: 'js', file: 'metisMenu.min.js')}"></script>
	-->
    <!-- Custom Theme JavaScript 
    <script type="text/javascript" src="${resource(dir: 'js', file: 'sb-admin-2.js')}"></script>
	-->
		
</body>

</html>