var create_originalmy_button = function () {
  var btn_text = "<span style='padding-left:10px; padding-right:10px; float: left;'>Entrar com OriginalMy</span>";
  var btn_img = "https://originalmy.com/assets/images/logos/circle.png";
  var btn_img_width = "30px"
  var btn_text_color = "#616161";
  var btn_text_align = "center";
  var btn_text_weigth = "bold";
  var btn_text_size = "16px";
  var btn_color = "#fff";
  var btn_color_hover = "#f1f1f1";
  var btn_border = "1px solid #e6e6e6";
  var btn_border_hover = "1px solid #b9b9b9";
  var btn_line_height = "40px";

  $("#ORIGINALMY_BTN").html(btn_text);
  $("#ORIGINALMY_BTN").prepend("<img src=" + btn_img + " alt='originalmy_logo' style='margin: 5px; float:left;'>");
  $("#ORIGINALMY_BTN").find("img").css("width", btn_img_width);
  $("#ORIGINALMY_BTN").css("box-sizing", "border-box");
  $("#ORIGINALMY_BTN").css("text-align", btn_text_align);
  $("#ORIGINALMY_BTN").css("font-size", btn_text_size);
  $("#ORIGINALMY_BTN").css("font-weight", btn_text_weigth);
  $("#ORIGINALMY_BTN").css("background-color", btn_color);
  $("#ORIGINALMY_BTN").css("color", btn_text_color);
  $("#ORIGINALMY_BTN").css("border", btn_border);
  $("#ORIGINALMY_BTN").css("cursor", "pointer");
  $("#ORIGINALMY_BTN").css("line-height", btn_line_height);

  $("#ORIGINALMY_BTN").hover(function (e) {
    $(this).css("background-color", e.type === "mouseenter" ? btn_color_hover : btn_color);
    $(this).css("border", e.type === "mouseenter" ? btn_border_hover : btn_border);
  });
  $("#ORIGINALMY_BTN").focus(function () {
    $(this).css("outline", "none");
  });

  $("#ORIGINALMY_BTN").click(function () {
    $("#ORIGINALMY_MODAL").css("display", "block");
  });
}

var create_originalmy_modal = function () {
  var content_div = "<div id='ORIGINALMY_MODAL_CONTENT'></div>"
  var content_background_color = "#fefefe";
  var background_gradient_1 = "-webkit-linear-gradient(left top, #EDE574, #E1F5C4)";
  var background_gradient_2 = "-o-linear-gradient(bottom right, #EDE574, #E1F5C4)";
  var background_gradient_3 = "-moz-linear-gradient(bottom right, #EDE574, #E1F5C4)";
  var background_gradient_4 = "linear-gradient(to bottom right, #EDE574, #E1F5C4)";
  var content_margin = "5% auto";
  var content_padding = "20px";
  var content_border = "1px solid #888";
  var content_width = "400px";
  var content_text_align = "center";
  var close_btn = "<span id='ORIGINALMY_CLOSE_BTN'>&times;</span>";
  var originalmy_logo = "https://originalmy.com/assets/images/logos/originalmy-logo-site2.png";

  $("#ORIGINALMY_MODAL").css("display", "none");
  $("#ORIGINALMY_MODAL").css("position", "fixed");
  $("#ORIGINALMY_MODAL").css("z-index", "99999");
  $("#ORIGINALMY_MODAL").css("left", "0");
  $("#ORIGINALMY_MODAL").css("top", "0");
  $("#ORIGINALMY_MODAL").css("width", "100%");
  $("#ORIGINALMY_MODAL").css("height", "100%");
  $("#ORIGINALMY_MODAL").css("overflow", "auto");
  $("#ORIGINALMY_MODAL").css("background-color", "rgb(0,0,0)");
  $("#ORIGINALMY_MODAL").css("background-color", "rgba(0,0,0,0.4)");

  $("#ORIGINALMY_MODAL").append(content_div);
  $("#ORIGINALMY_MODAL_CONTENT").append("<div>" + close_btn + "</div>");
  $("#ORIGINALMY_MODAL_CONTENT").append("<div><img src=" + originalmy_logo + " style='max-width:150px; margin-bottom: 10px;'></div>");
  $("#ORIGINALMY_MODAL_CONTENT").append("<div id='OMAUTHID' style='background: transparent'></div>");
  $("#ORIGINALMY_MODAL_CONTENT").append("<div style='text-align:center; margin-top: 10px;'><a href='https://originalmy.com' target='_blank'>Precisa de ajuda?</a></div>");
  $("#ORIGINALMY_MODAL_CONTENT").css("background", content_background_color);
  $("#ORIGINALMY_MODAL_CONTENT").css("background", background_gradient_1);
  $("#ORIGINALMY_MODAL_CONTENT").css("background", background_gradient_2);
  $("#ORIGINALMY_MODAL_CONTENT").css("background", background_gradient_3);
  $("#ORIGINALMY_MODAL_CONTENT").css("background", background_gradient_4);
  $("#ORIGINALMY_MODAL_CONTENT").css("margin", content_margin);
  $("#ORIGINALMY_MODAL_CONTENT").css("padding", content_padding);
  $("#ORIGINALMY_MODAL_CONTENT").css("border", content_border);
  $("#ORIGINALMY_MODAL_CONTENT").css("width", content_width);
  $("#ORIGINALMY_MODAL_CONTENT").css("text-align", content_text_align);
  $("#ORIGINALMY_MODAL_CONTENT").css("border-radius", "10px");

  $("#ORIGINALMY_CLOSE_BTN").css("color", "#aaa");
  $("#ORIGINALMY_CLOSE_BTN").css("float", "right");
  $("#ORIGINALMY_CLOSE_BTN").css("font-size", "28px");
  $("#ORIGINALMY_CLOSE_BTN").css("font-weigth", "bold");

  $("#ORIGINALMY_CLOSE_BTN").hover(function (e) {
    $(this).css("color", e.type === "mouseenter" ? "black" : "#aaa");
    $(this).css("cursor", e.type === "mouseenter" ? "pointer" : "arrow");
  });

  $("#ORIGINALMY_CLOSE_BTN").click(function () {
    $("#ORIGINALMY_MODAL").css("display", "none");
  })

}

$(document).ready(function () {
  create_originalmy_modal();
})

var OMID = function (p_cId, p_site, p_infos, p_callback_func) {
  this._cId = p_cId;
  this._site = p_site;
  this._infos = p_infos;
  this._timeStart = new Date().getTime();
  this._callback_url = p_callback_func;
  this._execute_timeout = true;
  this.createBtn();
};

OMID.prototype.createBtn = function () {
  var that = this;
  create_originalmy_button();
  $("#ORIGINALMY_BTN").click(function () {
    that.init();
  });
}

OMID.prototype.init = function () {
  var that = this;
  that._execute_timeout = true;
  that.getConnfig(that._site)
    .then(function (data) {
      if (data.status !== "success") {
        console.log('Error: ' + data.data.message);
      } else {
        that._base_path = data.data.base_path.toString();
        that.getNonce()
          .then(function (data) {
            if (data.status !== "success")
             $("#OMAUTHID").html("<div class='alert alert-danger'>" + data.data.message + "</div>");
            else {
              that._nonce = data.data.auth;
              that.timeout_status = setTimeout(that.getAuth.bind(that), 1000);
              that.render.bind(that)();
            }
          })
      }
    })
  $("#ORIGINALMY_CLOSE_BTN").click(function () {
    that.close();
  });
}

OMID.prototype.close = function () {
  var that = this;
  that._execute_timeout = false;
  clearTimeout(that.timeout_status)
  $("#OMAUTHID").html("");
}

OMID.prototype.render = function () {
  var link = document.createElement("A");
  link.setAttribute("href", this._nonce.uri);
  var img = document.createElement("IMG");
  img.setAttribute("src", this._nonce.qrcode);
  link.appendChild(img)
  document.getElementById("OMAUTHID").appendChild(link);
}

OMID.prototype.callback = function (data) {
  this._callback_url(data);
}

OMID.prototype.validateAuthDataResult = function (data) {

  if (data && data.status !== "success") {
    if (data && data.data && data.data.type === "expired") {
      this.close();
      $("#OMAUTHID").html("<div class='alert alert-danger'>" + data.data.message + "</div>");
    }
  }
  else if (data && data.data && data.data.auth == 1){
    this.close();
    $("#ORIGINALMY_MODAL").hide();
    this.callback(data.data);
  }
}

OMID.prototype.getAuth = function () {
  var that = this;
  $.ajax({
    url: that._base_path + "/login/status/" + that._nonce.nonce.nid,
    type: "get",
    success: function (data) { that.validateAuthDataResult(data) }
  });
  if (this._execute_timeout) {
    that.timeout_status = setTimeout(that.getAuth.bind(that), 2000);
  }
}

OMID.prototype.getNonce = function () {
  return $.ajax({
    url: this._base_path + '/login/nonce/' + this._cId + '/' + this._site + '/' + this._infos.toString(),
    type: "get"
  });
}

OMID.prototype.getConnfig = function () {
  return $.ajax({
    url: 'https://api1.originalmy.com/login/config/' + this._site,
    type: "get"
  });
}
