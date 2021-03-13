const setup = () => {
    const getTheme = () => {
        if (window.localStorage.getItem('dark')) {
            return JSON.parse(window.localStorage.getItem('dark'))
        }
        return !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    const setTheme = (value) => {
        window.localStorage.setItem('dark', value)
    }

    return {
        loading: true,
        isDark: getTheme(),
        toggleTheme() {
            this.isDark = !this.isDark
            setTheme(this.isDark)
        },
        setLightTheme() {
            this.isDark = false
            setTheme(this.isDark)
        },
        setDarkTheme() {
            this.isDark = true
            setTheme(this.isDark)
        }
    }
}

    /* ================
@Param Form action
================ */ 
$('body').on('submit', 'form.action', function(e)
{
	/* stop form from submitting normally */
	e.preventDefault();

	// var formData = JSON.stringify(fixForm($(this).serialize()));
    
    var formData = $(this).serialize();

    // Check if there is Custom path for the route
    var prefixPath = (jQuery(this).attr('data-path')) ? jQuery(this).attr('data-path') : '';

    var _respond_id = jQuery('#_respond_id').val();

	$.ajax({
		type: "POST",
		dataType: "JSON",
		url: rootURL + prefixPath,
		data: formData,
		success: function (html) {
		    $('#' + _respond_id).html(html.output);

 		}, error: function (err) {
		    $('#' + _respond_id).html(err.responseText);
 		}
	}); 
});


function fixForm(data)
{

    let dataArr = JSON.stringify( data );

    if(dataArr.indexOf('?') > -1){
        queryString = dataArr.split('?')[1];
      }
      var pairs = dataArr.split('&');
      var result = {};
      pairs.forEach(function(pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
      });
      return result;
}



jQuery(document).ready(function(){

	$.ajax({
		type: "GET",
		url: jsonURL,
		success: function (html) {

			if (html.pagesList && app)
			{
				app.pagesList = html.pagesList; 
				app.response_fields = html.response_fields; 
        			app.handlePage();
			}


 		}, error: function (err) {
 			if (err.responseText)
 			{
			    console.log(JSON.parse(err.responseText));
 			}
 		}
	}); 
});



