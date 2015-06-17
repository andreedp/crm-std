<!doctype html>
<html>
	<head>
		<meta name="layout" content="main"/>
		<title>CRM Marketing</title>
	</head>
	<body>	
		<sec:ifLoggedIn>
    		<p>Your Logged in!</p>
		</sec:ifLoggedIn>
		
		<div class="di-main-menu">
			<nav class="navbar navbar-default" role="navigation">
			  <!-- Brand and toggle get grouped for better mobile display -->
			  <div class="navbar-header">
			    <a class="navbar-brand" ng-bind="currentUser.tenantName"></a>
			  </div>
			
			  <!-- Collect the nav links, forms, and other content for toggling -->
			  <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			    <ul class="nav navbar-nav">
			      <li><a href="#">Home</a></li>
			      <li class="dropdown">
			        <a href="#" class="dropdown-toggle" data-toggle="dropdown">Register<b class="caret"></b></a>
			        <ul class="dropdown-menu">
                        <li><a ng-href="#/patient/create">New Patient</a></li>
                        <li><a>Patient</a></li>
                        <li class="divider"></li>
                        <li><a ng-href="#/patient">Patient List</a></li>
                    </ul>
			      </li>
			      <li class="dropdown">
			        <a href="#" class="dropdown-toggle" data-toggle="dropdown">Consultation <b class="caret"></b></a>
			        <ul class="dropdown-menu">
                        <li><a ng-href="#/appointment/create">New Appointment</a></li>
                        <li><a ng-href="#/appointment">Appointment List</a></li>
                        <li class="divider"></li>
                        <li><a ng-href="#/visit">Visit</a></li>
                        <li><a ng-href="#/dispensary">Dispensary</a></li>
                    </ul>
			      </li>			      
			      <li class="dropdown">
			        <a href="#" class="dropdown-toggle" data-toggle="dropdown">Master Data <b class="caret"></b></a>
			        <ul class="dropdown-menu">
                        <li><a ng-href="#/patient">{{'MAIN_MENU_PATIENT' | translate }}</a></li>
                        <li><a ng-href="#/itemStock">{{'MAIN_MENU_STOCK' | translate }}</a></li>
                        <li><a ng-href="#/drugVendor">{{'MAIN_MENU_SUPPLIER' | translate }}</a></li>
                        <li class="divider"></li>
                        <li><a ng-href="#/item">{{'MAIN_MENU_ITEM' | translate }}</a></li>
                        <li><a ng-href="#/itemInfo">{{'MAIN_MENU_ITEM_INFO' | translate }}</a></li>
                        <li class="divider"></li>
                        <li><a ng-href="#/itemUnit">{{'MAIN_MENU_ITEM_UNIT' | translate }}</a></li>
                        <li><a ng-href="#/itemType">{{'MAIN_MENU_ITEM_TYPE' | translate }}</a></li>
                        <li><a ng-href="#/medicineForm">{{'MAIN_MENU_MEDICINE_FORM' | translate }}</a></li>
                        <li><a ng-href="#/paymentType">{{'MAIN_MENU_PAYMENT_TYPE' | translate }}</a></li>
                        <li class="divider"></li>
                        <li><a ng-href="#/clinic">{{'MAIN_MENU_CLINIC' | translate }}</a></li>
                        <li><a ng-href="#/user">{{'MAIN_MENU_USER' | translate }}</a></li>
                        <sec:ifAnyGranted roles='ROLE_MASTER'>
                        <li><a ng-href="#/tenant">{{'MAIN_MENU_TENANT' | translate }}</a></li>
                        <li><a ng-href="#/role">{{'MAIN_MENU_ROLE' | translate }}</a></li>
                        </sec:ifAnyGranted>
                    </ul>
			      </li>
			    </ul>			    
			    <ul class="nav navbar-nav navbar-right" ng-controller="LanguageController">			       
			      <li class="dropdown">
			        <a class="dropdown-toggle" data-toggle="dropdown"><span ng-bind="currentUser.username"></span> <b class="caret"></b></a>
			        <ul class="dropdown-menu">
			          <li ng-repeat='clinic in clinics' ng-class='{diClinicSelected: isSelectedClinic($index)}'>
                   		<a  ng-click="selectClinic($index, clinic)">{{clinic.name}}</a>
					  </li>
		              <li class="divider"></li>
		              <li><a ng-click="clearAlerts()">Clear Alerts</a></li>
			          <li><a ng-href="#/settings">Settings</a></li>
			          <li class="divider"></li>
			          <li><a ng-href="/itcm/logout">Logout</a></li>
			        </ul>
			      </li>
			    </ul>
			  </div><!-- /.navbar-collapse -->
			</nav>
		</div>
		<div class="di-main-fill-view" di-loading-bar>
			Loading ... <img src="${resource(dir:'images',file:'loader.gif')}"/>
		</div>
		<div class="di-main-menu">
		  <alert ng-repeat="alert in alerts" type="alert.type" close="closeAlert($index)">{{alert.message}}</alert>
		</div>	
		</div>	
		<div ng-view class="di-main-fill-view"></div>
  		<script data-main="/itcm/static/js/main" src="${resource(dir:'js/vendor/requirejs',file:'require.js')}" ></script>
		
		<sec:ifAllGranted roles="ROLE_ADMIN">
		<form name="logout" method="POST" action="${createLink(controller:'logout') }"> <input type="submit" value="logout"></form>
</sec:ifAllGranted>
	</body>
</html>