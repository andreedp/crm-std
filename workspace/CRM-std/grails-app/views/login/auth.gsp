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

    <!-- MetisMenu CSS -->    
    <link rel="stylesheet" type="text/css" href="${resource(dir: 'css', file: 'metisMenu.min.css')}" />

    <!-- Custom CSS -->    
    <link rel="stylesheet" type="text/css" href="${resource(dir: 'css', file: 'sb-admin-2.css')}" />

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
		
	<form action='${postUrl}' method='POST' id='loginForm' class='cssform' autocomplete='off'>	
    <div class="container">
        <div class="row vertical-offset-100">
            <div class="col-md-4 col-md-offset-4">
            <div class="panel panel-default">
                <div class="panel-heading">
                		<!-- <img src="${resource(dir: 'images', file: 'crm.jpg')}" alt=""></img> -->
                        <h3 class="panel-title">Please Sign In</h3>
                    </div>
                    <div class="panel-body">
                        <form role="form">
                            <fieldset>
                                <div class="form-group">
                                    <input class="form-control" placeholder="Username" name="j_username" type="text" autofocus>
                                </div>
                                <div class="form-group">
                                    <input class="form-control" placeholder="Password" name="j_password" type="password" value="">
                                </div>
                                <div class="checkbox">
                                    <label>
                                        <input name="remember" type="checkbox" value="Remember Me">Remember Me
                                    </label>
                                </div>
                                <!-- Change this to a button or input when using this as a form -->
                                <input type="submit" name="Submit" value="Login" class="btn btn-lg btn-success btn-block" />
                            </fieldset>
                        </form>
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

    <!-- Metis Menu Plugin JavaScript -->    
    <script type="text/javascript" src="${resource(dir: 'js', file: 'metisMenu.min.js')}"></script>

    <!-- Custom Theme JavaScript -->
    <script type="text/javascript" src="${resource(dir: 'js', file: 'sb-admin-2.js')}"></script>
	
	
<!-- footer -->
	<footer id="footer">
		<div class="text-center padder">
			<p>
				<small>Customer Relationship Management<br/> 
				Standard Edition <br/>
				Version <g:meta name="app.version"/><br/> <br/>
				All rights reserved &copy;  2015 Phintraco </small>
			</p>
		</div>
	</footer> 	
</body>

</html>