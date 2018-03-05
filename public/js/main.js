var Main = {

    pageNS : null,
    navbarList : null,

    onReady: function()
    {
        this.pageNS = $("body#bodyMainID").data('pagens');
        this.navbarList = $("#navbarListID");
        
        this.menuActive();
    },

    menuActive : function()
    {
        this.navbarList.find("li.nav-item").removeClass('active');
        if(this.pageNS){
            this.navbarList.find("li [data-pagens="+this.pageNS+"]").addClass('active');
        }
    },

};

$(document).ready(function() {

	//calling jPreLoader
	$('body').jpreLoader({
		splashID: "#jSplash",
		loaderVPos: '50%',
		autoClose: true,
		splashFunction: function() {
			//passing Splash Screen script to jPreLoader
			$('#jSplash').hide().fadeIn(800);
		}
	});

    Main.onReady();
});