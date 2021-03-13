
var app = new Vue({
    el: '#medians-wrap',
    data: {
    	rootURL: 'http://192.168.1.99/Medians/api/test.php',
    	token: 'fd4d5aee246fa82e95f44cb56ca32f39ef886443b35c2765a34eb386433fb6e30cf7212da495a9043451ad97af379244334bebf2f51ceccd44d4a4b698d70ccc',
        isDark: false,
    	isActive: false,
    	currnetPage: 'Login-tab',
    	isSidebarOpen: false,
    	open: false,
    	activeTabe: false,
    	
    	title: 'Medians',
    	pagesList: [],
        response_fields: []
	},
    created() {
        this.handlePage();
    },
    
    methods: 
    {
        toggleMenu() 
        {
        	this.isActive = (this.isActive) ? false : true;
        	this.open = (this.open) ? false : true;
        	this.isSidebarOpen = (this.isSidebarOpen) ? false : true;
        	if (this.isSidebarOpen)
        	{
	        	jQuery('#head-menu').css("display", "block") ;
        	} else {
	        	jQuery('#head-menu').css("display", "none") ;
        	}
        },
        setTabs(link, page = null)
        {
        	this.activeTabe = link;
    		for (var i = this.pagesList.length - 1; i >= 0; i--) 
    		{
    			if (page == this.pagesList[i].type )
    			{
		    		this.pagesList[i].activeTabe = link;
    			}
    		}
        },
        showPage(link)
        {
        	this.currnetPage = link;
        	this.toggleMenu();
        },
        handlePage()
        {

            for (var i = this.pagesList.length - 1; i >= 0; i--) 
            {
                
                this.pagesList[i].response_fields = this.response_fields;

                this.pagesList[i].activeTabe = 'action';

                switch(this.pagesList[i].type)
                {
                    case 'home':
                        this.pagesList[i].request_fields.push({key: 'branch', value:'', field_type:'number', notes: '// Optional'} );
                        this.pagesList[i].tokenization = true;
                        this.pagesList[i].response_fields[1].value[0].contentType = '[]';
                        break;

                    case 'login':
                        this.pagesList[i].request_fields.push({key: 'email', value:'', notes: '// Required'} );
                        this.pagesList[i].request_fields.push({key: 'password', value:'', notes: '// Required'} );

                        this.pagesList[i].response_fields[1].value[0].contentType = '{}';

                        break;

                    case 'signup':
                        this.pagesList[i].fields = [
                            {key: 'type', value:'signup', field_type:'text', notes: '// Required'},
                            {key: 'fullname', value:'', field_type:'text', notes: '// Required'},
                            {key: 'agent', value:'', field_type:'number', notes: '// Agent ID Required ( From Dropdown list )'},
                            {key: 'branch', value:'', field_type:'number', notes: '// Agent ID Required ( From Dropdown list Based on the Agent )'},
                            {key: 'email', value:'', field_type:'email', notes: '// Required'},
                            {key: 'password', value:'', field_type:'password', notes: '// Required'}
                        ];
                        
                        this.pagesList[i].response_fields[1].value[0].contentType = '{}';

                        this.pagesList[i].response_fields[1].value[0].value = [
                            {key:'userid', value:'NUMBER', notes: '// Customer id'},
                            {key:'token', value: 'STRING', notes: '// TOKEN used for API requests'},
                            {key:'data', value: '{}' , notes: '// Customer information ( Object )'},
                            {key:'...', value: '', notes: '// Some extra keys'}
                        ];
                        break;

                    case 'product':
                        this.pagesList[i].tokenization = true;
                        this.pagesList[i].request_fields.push({key: 'id', value:'', field_type:'number', notes: '// Product ID Required '} );
                        this.pagesList[i].request_fields.push({key: 'class', value:'', field_type:'text', notes: '// Optional: Product class ( FoodMenu , Frozen ) '});

                        this.pagesList[i].response_fields[1].value[0].contentType = '{}';

                        this.pagesList[i].response_fields[1].value[0].value = [
                            {key:'id', value:'NUMBER', notes: '// Stock id'},
                            {key:'itemid', value: 'STRING', notes: '// Product ID'},
                            {key:'item_*', value: '' , notes: '// Product data has prefix ( item_ ) '},
                            {key:'branch_*', value: '' , notes: '// Branch data has prefix ( branch_ ) '},
                            {key:'...', value: '', notes: '// Some extra keys'}
                        ];
                        break;

                    case 'profile':
                        this.pagesList[i].tokenization = true;
                        
                        this.pagesList[i].response_fields[1].value[0].contentType = '{}';

                        this.pagesList[i].response_fields[1].value[0].value = [
                            {key:'id', value:'NUMBER', notes: '// Customer id'},
                            {key:'fullname', value: 'STRING', notes: '// Customer fullname'},
                            {key:'email', value: 'STRING', notes: '// Customer email'},
                            {key:'...', value: '', notes: '// Some extra keys'}
                        ];
                        break;

                    case 'addCart':
                        this.pagesList[i].tokenization = true;
                        this.pagesList[i].request_fields.push( {key: 'itemid', value:'', field_type:'number', notes: '// Product ID Required '});
                        this.pagesList[i].request_fields.push({key: 'qty', value: '', field_type:'number', notes: '// Optional: Default 1'} );
                        this.pagesList[i].request_fields.push({key: 'branch', value: '', field_type:'number', notes: '// Optional: Based on the customer location'} );
                            
                        this.pagesList[i].response_fields[1].value[0].contentType = 'string';
                        this.pagesList[i].response_fields[1].value[0].value = 'STRING';
                        break;

                    case 'deleteCart':
                        this.pagesList[i].tokenization = true;
                        this.pagesList[i].request_fields.push( {key: 'id', value:'', field_type:'number', notes: '// CART ID Required ( NOT Product ID ) '});
                            
                        this.pagesList[i].response_fields[1].value[0].contentType = 'string';
                        this.pagesList[i].response_fields[1].value[0].value = 'STRING';
                        break;

                    case 'getCart':
                        this.pagesList[i].tokenization = true;

                        this.pagesList[i].response_fields[1].value[0].contentType = '{}';
                            
                        this.pagesList[i].response_fields[1].value[0].value = [

                            {key:'items', value: [], notes: '// Products list'},
                            {key:'discount_value', value: 0, notes: '// Discount value  ( If have coupon code submitted ) '},
                            {key:'discount_type', value: null, notes: '// Discount type  ( Fixed / Percentage ) '},
                            {key:'totalPrice', value: null, notes: '// Sub-total cost '},
                            {key:'totalCost', value: null, notes: '// Total cost '},
                            {key:'cur', value: null, notes: '// Cart currency ( Default: EGP ) '},
                            {key:'payment_methods', value: [], notes: '// Available Payment methods '},
                        ];
                        break;

                    case 'getBranches':
                        this.pagesList[i].request_fields.push( {key: 'agent', value:'', field_type:'number', notes: '// Agent  ID Required '});
                            
                        this.pagesList[i].response_fields[1].value[0].contentType = '[]';

                        this.pagesList[i].response_fields[1].value[0].value = [
                            {key:'id', value: 1, notes: '// Branch ID'},
                            {key:'name', value: '', notes: '// Branch Name'},
                            {key:'agent', value: 1, notes: '// Agent ID'},
                        ];
                        break;

                    case 'getCompanies':
                            
                        this.pagesList[i].response_fields[1].value[0].contentType = '[]';

                        this.pagesList[i].response_fields[1].value[0].value = [
                            {key:'id', value: 1, notes: '// Agent ID'},
                            {key:'code', value: '', notes: '// Agent code'},
                        ];
                        break;

                    case 'getOrder':
                        this.pagesList[i].tokenization = true;
                        
                        this.pagesList[i].request_fields.push( {key: 'id', value:'', field_type:'number', notes: '// Order ID Required '});
                            
                        this.pagesList[i].response_fields[1].value[0].contentType = '{}';

                        this.pagesList[i].response_fields[1].value[0].value = [
                            {key:'items', value: [], notes: '// Order products list'},
                            {key:'id', value: 1, notes: '// Order ID'},
                            {key:'cost', value: 1, notes: '// Order Cost'},
                            {key:'order_status', value: '', notes: '// Order Status'},
                            {key:'payment_method', value: 1, notes: '// Payment method'},
                            {key:'user_*', value: {}, notes: '// Customer information with prefix ( user_ ) '},
                            {key:'...', value: '', notes: '// Some extra keys'}
                        ];
                        break;

                    case 'getOrders':
                        this.pagesList[i].tokenization = true;
                            
                        this.pagesList[i].response_fields[1].value[0].contentType = '[]';

                        this.pagesList[i].response_fields[1].value[0].value = [
                            {key:'items', value: [], notes: '// Order products list'},
                            {key:'id', value: 1, notes: '// Order ID'},
                            {key:'cost', value: 1, notes: '// Order Cost'},
                            {key:'order_status', value: '', notes: '// Order Status'},
                            {key:'payment_method', value: 1, notes: '// Payment method'},
                            {key:'user_*', value: {}, notes: '// Customer information with prefix ( user_ ) '},
                            {key:'...', value: '', notes: '// Some extra keys'}
                        ];
                        break;

                    case 'checkCode':
                        this.pagesList[i].tokenization = true;
                        this.pagesList[i].request_fields.push( {key: 'code', value:'', field_type:'text', notes: '// Code Required '});
                        this.pagesList[i].response_fields[1].value[0].contentType = 'string';
                        this.pagesList[i].response_fields[1].value[0].value = [];
                        break;
                }
            }
        }
    }
});




