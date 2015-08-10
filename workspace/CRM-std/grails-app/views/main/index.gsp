<%@ page import="crm.std.core.SecAppUser" %>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Customer Relationship Management</title>
    	
	<!-- Bootstrap Core CSS -->    
    <link rel="stylesheet" type="text/css" href="${resource(dir: 'css', file: 'bootstrap.min.css')}" />	
	
    <!-- Custom CSS -->    
    <link rel="stylesheet" type="text/css" href="${resource(dir: 'css', file: 'sb-admin.css')}" />

	<!-- Morris Charts CSS -->    
    <link rel="stylesheet" type="text/css" href="${resource(dir: 'css', file: 'morris.css')}" />

    <!-- Custom Fonts -->    
	<link rel="stylesheet" type="text/css" href="${resource(dir: 'css', file: 'font-awesome.min.css')}" />

	<!-- Date Range CSS -->    
	<link rel="stylesheet" type="text/css" href="${resource(dir: 'css', file: 'daterangepicker-bs3.css')}" />

	<link rel="stylesheet" type="text/css" href="${resource(dir: 'css', file: 'crm.css')}" />


    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>
	
    <div id="wrapper">
		
        <!-- Navigation -->
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation" ng-controller="currentUserController">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header" >
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Velis CRM</a>
            </div>
            <!-- Top Menu Items -->
            <ul class="nav navbar-right top-nav">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-envelope"></i> <b class="caret"></b></a>
                    <ul class="dropdown-menu message-dropdown">
                        <li class="message-preview">
                            <a href="#">
                                <div class="media">
                                    <span class="pull-left">
                                        <img class="media-object" src="http://placehold.it/50x50" alt="">
                                    </span>
                                    <div class="media-body">
                                        <h5 class="media-heading"><strong>John Smith</strong>
                                        </h5>
                                        <p class="small text-muted"><i class="fa fa-clock-o"></i> Yesterday at 4:32 PM</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur...</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="message-preview">
                            <a href="#">
                                <div class="media">
                                    <span class="pull-left">
                                        <img class="media-object" src="http://placehold.it/50x50" alt="">
                                    </span>
                                    <div class="media-body">
                                        <h5 class="media-heading"><strong>John Smith</strong>
                                        </h5>
                                        <p class="small text-muted"><i class="fa fa-clock-o"></i> Yesterday at 4:32 PM</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur...</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="message-preview">
                            <a href="#">
                                <div class="media">
                                    <span class="pull-left">
                                        <img class="media-object" src="http://placehold.it/50x50" alt="">
                                    </span>
                                    <div class="media-body">
                                        <h5 class="media-heading"><strong>John Smith</strong>
                                        </h5>
                                        <p class="small text-muted"><i class="fa fa-clock-o"></i> Yesterday at 4:32 PM</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur...</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="message-footer">
                            <a href="#">Read All New Messages</a>
                        </li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-bell"></i> <b class="caret"></b></a>
                    <ul class="dropdown-menu alert-dropdown">
                        <li>
                            <a href="#">Alert Name <span class="label label-default">Alert Badge</span></a>
                        </li>
                        <li>
                            <a href="#">Alert Name <span class="label label-primary">Alert Badge</span></a>
                        </li>
                        <li>
                            <a href="#">Alert Name <span class="label label-success">Alert Badge</span></a>
                        </li>
                        <li>
                            <a href="#">Alert Name <span class="label label-info">Alert Badge</span></a>
                        </li>
                        <li>
                            <a href="#">Alert Name <span class="label label-warning">Alert Badge</span></a>
                        </li>
                        <li>
                            <a href="#">Alert Name <span class="label label-danger">Alert Badge</span></a>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <a href="#">View All</a>
                        </li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-user"></i> {{currentUser}} <b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li>
                            <a href="#"><i class="fa fa-fw fa-user"></i> Profile</a>
                        </li>
                        <li>
                            <a href="#"><i class="fa fa-fw fa-envelope"></i> Inbox</a>
                        </li>
                        <li>
                            <a href="#"><i class="fa fa-fw fa-gear"></i> Settings</a>
                        </li>
                        <li class="divider"></li>
                        <li>                            
                            <a href="${createLink(controller: 'logout')}"><i class="fa fa-fw fa-power-off"></i> Log Out</a>	                            
                        </li>
                    </ul>
                </li>
            </ul>
            <!-- Sidebar Menu Items - These collapse to the responsive navigation menu on small screens -->
            <div class="collapse navbar-collapse navbar-ex1-collapse">
                <ul class="nav navbar-nav side-nav">
                    <li>
                        <a ng-href="#/"><i class="fa fa-fw fa-dashboard"></i> Dashboard</a>
                    </li>
                    <li>
                        <a ng-href="#/lead/list"><i class="fa fa-fw fa-bullseye"></i> Leads</a>
                    </li>
                    <li>
                        <a ng-href="#/contact/list"><i class="fa fa-fw fa-male"></i> Contact</a>
                    </li>                
                    <li>
                        <a ng-href="#/opportunity/list"><i class="fa fa-fw fa-sign-in"></i> Opportunity</a>
                    </li>
                    <li>
                        <a ng-href="#/account/list"><i class="fa fa-fw fa-group"></i> Account</a>
                    </li>
                    <li>
                        <a ng-href="#/campaign/list"><i class="fa fa-fw fa-desktop"></i> Campaign</a>
                    </li>
                     <li>
                        <a ng-href="#/task/list"><i class="fa fa-fw fa-tasks"></i> Task</a>
                    </li>
                    <li>
                    	<a href="javascript:;" data-toggle="collapse" data-target="#systemManagement"><i class="fa fa-fw fa-wrench"></i> System Management <i class="fa fa-fw fa-caret-down"></i></a>
                        <ul id="systemManagement" class="collapse">
                            <li>
                                <a href="#">Product</a>
                            </li>
                            <li>
                                <a href="#">User</a>
                            </li>
                            <li>
                                <a href="#">List Of Values</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="javascript:;" data-toggle="collapse" data-target="#report"><i class="fa fa-fw fa-file"></i> Report <i class="fa fa-fw fa-caret-down"></i></a>
                        <ul id="report" class="collapse">
                            <li>
                                <a href="#">Leads Report</a>
                            </li>
                            <li>
                                <a href="#">Opportunity Report</a>
                            </li>
                            <li>
                                <a href="#">Campaign Report</a>
                            </li>
                        </ul>
                    </li>
                    <!--<li>
                        <a href="blank-page.html"><i class="fa fa-fw fa-file"></i> Report</a>
                    </li>
                    <li>
                        <a href="index-rtl.html"><i class="fa fa-fw fa-dashboard"></i> RTL Dashboard</a>
                    </li>-->
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </nav>

         <div id="page-wrapper">
            <div class="container-fluid fill">
                <div class="row" ng-controller="alertController">
              		<div class="col-lg-12">                       
                  		<alert ng-repeat="alert in alerts" type="alert.type" close="alert.close()" data-dismiss="alert">{{alert.msg}}</alert>                       
              		</div>
        		</div>       		 
   				<div class="view-container fill">
					<div ng-view class="view-frame fill"></div>
				</div>	
				<hr />			
			    <footer>
			    	<div ng-controller="footerController">
				    	<p class="pull-right"><a scroll-to="">Back to Top</a></a></p>
				        <p>&copy; Phintraco 2015</p>
			        </div>
			    </footer>			
  			</div>
            <!-- /.container-fluid -->    
                   			
        </div>
        <!-- /#page-wrapper -->
        
    </div>
    <!-- /#wrapper -->    
   	
	<script type="text/javascript" src="app/vendor/requirejs/require.js" data-main="app/main"></script>
</body>


</html>