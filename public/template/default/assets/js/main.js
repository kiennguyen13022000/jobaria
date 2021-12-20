$(function () {
  
  // Start wow js
  new WOW().init();
  if ($("#price_total_products").length > 0) {
    renderProduct();
  }
  if ($(".billing_order_form").length > 0) {
    renderPriceCheckout(0);
  }
  //owl-carousel
  $(".select_country").select2({ dropdownCssClass: "select_country", width: "100%" });
  $(".select_cat").select2({ dropdownCssClass: "select_box" });
  $(".product_size").select2({ dropdownCssClass: "per_page_css", width: "100%" });
  $(".per_page_select").select2({ dropdownCssClass: "per_page_css", width: "100%" });
  $(".select_sort").select2({ dropdownCssClass: "select_sort_css", width: "100%" });
  if ($(".jorbaria_slider").length > 0) {
    var $owl = $(".jorbaria_slider");
    $owl.owlCarousel({
      loop: true,
      autoplay: 1000,
      nav: false,
      dots: true,
      items: 1,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
    });
    
  }
  if ($(".list_item_product").length > 0) {
    var $owl = $(".list_item_product");
    $owl.owlCarousel({
      loop: false,
      nav: false,
      dots: true,
      // autoPlay: 2500,
      smartSpeed: 1000,
      items: 1,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 3,
        },
        1200: {
          items: 4,
        },
      },
    });
  }
  if ($(".product_style_mall").length > 0) {
    var $owl = $(".product_style_mall");
    $owl.owlCarousel({
      loop: false,
      nav: false,
      dots: true,
      // autoPlay: 2500,
      smartSpeed: 1200,
      items: 1,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 2,
        },
        992: {
          items: 1,
        },
      },
    });
  }
  if ($(".slide_discount").length > 0) {
    var $owl = $(".slide_discount");
    $owl.owlCarousel({
      loop: false,
      nav: false,
      dots: true,
      // autoPlay: 2500,
      smartSpeed: 1500,
      items: 2,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 2,
        },
      },
    });
  }

  // Back top top
  $(window).scroll(function () {
    if ($(this).scrollTop()) {
      $("#backTop").fadeIn();
    } else {
      $("#backTop").fadeOut();
    }
  });
  $("#backTop").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1000);
  });
  // Add slideUp animation
  $(".dropdown").on("show.bs.dropdown", function () {
    $(this).find(".dropdown-menu").first().stop(true, true).slideDown();
  });
  $(".dropdown").on("hide.bs.dropdown", function () {
    $(this).find(".dropdown-menu").first().stop(true, true).slideUp();
  });

  $(".check_ship_defferent_address").click(function () {
    $(".defferent_address_block").slideToggle();
    if ($(".check_ship_defferent_address:checked").length > 0) {
      $('.defferent_address .required').attr('required','required');
    }else{
      $('.defferent_address .required').removeAttr('required');
    }
  });

  //change number
  $(document).on("click", ".quantity-up", function () {
    $(this).prev().val(+$(this).prev().val() + 1);
  });
  $(document).on("click", ".quantity-down", function () {
    if ($(this).next().val() > 1)
      $(this).next().val(+$(this).next().val() - 1);
  });
  //change number cart page
  $(document).on("click", ".quantity_up_cart", function () {
    $(this).prev().val(+$(this).prev().val() + 1);
    var index = $(this).data("index");
    number_product = $(".number_product[data-index=" + index + "]").val();
    unit_price_product = $(".unit_price_product_val[data-index=" + index + "]").val();
    let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
    products.forEach((product,key)=>{
      if (index == key){
        product.number_product = $('.number_product[data-index='+key+']').val();
      }
    });
    localStorage.setItem("products", JSON.stringify(products));

    pricingProduct(index, number_product, unit_price_product);
  });
  $(document).on("click", ".quantity_down_cart", function () {
    if ($(this).next().val() > 1)
      $(this)
        .next()
        .val(+$(this).next().val() - 1);
    var index = $(this).data("index");
    number_product = $(".number_product[data-index=" + index + "]").val();
    unit_price_product = $(".unit_price_product_val[data-index=" + index + "]").val();
    let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
    products.forEach((product,key)=>{
      if (index == key){
        product.number_product = $('.number_product[data-index='+key+']').val();
      }
    });
    localStorage.setItem("products", JSON.stringify(products));
    pricingProduct(index, number_product, unit_price_product);
  });
  $(document).on("keydown", ":input:not(textarea)", function (event) {
    return event.key != "Enter";
  });
  $(document).on("keyup", ".number_product", function () {
    var $this = $(this);
    if ($this.val() > 99) {
      alert("You can only order up to 99 products");
      $this.val("99");
    }
    if ($this.val() < 1) {
      alert("Quantity must be at least 1");
      $this.val("1");
    }
    var product_id = $(this).data("product-id");
    number_product = $(".number_product[data-product-id=" + product_id + "]").val();
    unit_price_product = $(".unit_price_product_val[data-product-id=" + product_id + "]").val();

    pricingProduct(product_id, number_product, unit_price_product);
  });
  $(document).on("click", ".btn_proceed_checkout", function () {
    var $this = $(this);
    $form = $this.closest("form");
   
     let checkout = localStorage.getItem("checkout") ? JSON.parse(localStorage.getItem("checkout")) : [];
    // let data_form = getFormData($form);
    // checkout.push(data_form);
    let data_form =  [getFormData($form)];
    localStorage.setItem("checkout", JSON.stringify(data_form));
    window.location.href = 'checkout';
  });
  $(document).on("click", ".btn_add_cart", function () {
    var $this = $(this);
    $form = $this.closest("form");
    let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
    let data_form = getFormData($form);
    products.push(data_form);
    localStorage.setItem("products", JSON.stringify(products));
    renderCart();
    $.confirm({
      title: 'Product added to cart!',
      content: 'Do you want to go to cart page?',
      maxHeight: '200',
      buttons: {
          confirm: function () {
              $.alert('Confirmed!');
              window.location.href = '/cart.html';
          },
          cancel: function () {
              
          }
      }
    });
   
  });
  $(".btn_check_coupon").click(function () {
    var $this = $(this);
    $form = $this.closest('form');
     coupon_code = $(".coupon_input").val().trim();
    if (coupon_code === "" || coupon_code === null) {
      $(".notification_promotion").html("<i class='fas fa-times text-danger'></i> Please enter coupon code");
      $(".promotion_text").text("");
      $(".promotion").val(0);
     // $(".remaining_totals_box").hide();
      $(".cart_promotion").hide();
      if($form.hasClass('checkout_form')){
        pricingTotalProducts();
        return false;
      }
    }
    checkCoupon(coupon_code);
    if($form.hasClass('checkout_form'))  pricingTotalProducts();
    
  });
  $(".btn_place_order ").click(function () {
      var loggedIn = $('input[name="loggedIn"]').val();
      if (loggedIn != 1){
        $('.log_in_form h6').addClass('text-danger');
        $('html, body').animate({
          scrollTop: $(".log_in_form").offset().top
        }, 1200);
        return false;
      }

  });
});
//splide
if (document.querySelector("#slide__brand") !== null) {
  new Splide("#slide__brand", {
    perPage: 6,
    arrows: false,
    padding: 0,
    speed: 1400,
    pagination: false,
    rewind: true,
    breakpoints: {
      992: {
        perPage: 5,
      },
      768: {
        perPage: 4,
      },
      576: {
        perPage: 3,
      },
      414: {
        perPage: 2,
      },
      1: {
        perPage: 2,
      },
    },
  }).mount();
}
if (document.querySelector(".splide_modal") !== null) {
  document.addEventListener("DOMContentLoaded", function () {

  });
}
if (document.querySelector(".splide_detail") !== null) {
  document.addEventListener("DOMContentLoaded", function () {
    var main = new Splide(".splide_detail", {
      type: "fade",
      sliderSize: 350,
      rewind: true,
      pagination: false,
      classes: {
        arrows: "splide__arrows your-class-arrows",
        arrow: "splide__arrow your-class-arrow",
        prev: "splide__arrow--prev your-class-prev",
        next: "splide__arrow--next your-class-next",
      },
    });

    var thumbnails = new Splide(".thumbnail_splide_detail", {
      fixedWidth: 90,

      rewind: true,
      pagination: false,
      focus: "center",
      arrows: false,
      isNavigation: true,
      gap: 20,
    });

    main.sync(thumbnails);
    main.mount();
    thumbnails.mount();
  });
}

function format2(n, currency = "") {
  if (currency === "" || currency === null || currency === undefined) {
    return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
  }
  return currency + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}
function checkCoupon(coupon_code) {
  $.ajax({
    type: "POST",
    url: 'index.php?module=default&controller=order&action=checkCoupon',
    data: {coupon_code:coupon_code},
    dataType: 'json',
    async:false,
    success: function(data) {
      var $this = $('.btn_check_coupon');
      if (data.msg == "ok") {
        if($this.hasClass('btn_check_coupon_checkout')) renderPriceCheckout(1);
        $(".notification_promotion").html("<i class='fas fa-check text-success'></i> Coupon codes available");
        $(".cart_promotion").slideDown();
        $(".promotion_text").text(data.percent_text);
        $(".promotion").val(data.percent);
        if($this.hasClass('btn_check_coupon_checkout')) return false;
      } else {
        if($this.hasClass('btn_check_coupon_checkout')) renderPriceCheckout(1);
        $(".promotion_text").text("");
        $(".promotion").val(0);
        $(".cart_promotion").hide();
        $(".notification_promotion").html("<i class='fas fa-times text-danger'></i> Coupon code is invalid");
        if($this.hasClass('btn_check_coupon_checkout')) return false;
      }
    }
  });
}
function renderProduct() {
  let getlocalStorage = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
  if(getlocalStorage.length === 0){
    $(".checkout_form_box").html("");
    return false;
  }
  $("#empty_product").hide();
  $.ajax({
    type: "POST",
    url: 'index.php?module=default&controller=order&action=renderProduct',
    data: {getlocalStorage:getlocalStorage},
    dataType: 'json',
    success: function(data) {
      if (data.msg == 'ok'){
        $('#cart_table').html(data.productsContent);
        $('input[name="number_type"]').val(data.number_type);
       // checkCoupon($('input[name="coupon_input"]').val());
        pricingTotalProducts();
      }
    }
  });

}
function renderPriceCheckout(num) {
  var checkOutStorage = localStorage.getItem("checkout") ? JSON.parse(localStorage.getItem("checkout")) : [];
  var productsCart = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
  if (checkOutStorage.length === 0)  window.location.href = 'index.html';

  number_type = checkOutStorage[0]['number_type'];
  if(num != 1){
    coupon_input = checkOutStorage[0]['coupon_input'];
  }else{
    coupon_input = $(".coupon_input").val();
  }



  $.ajax({
    type: "POST",
    url: 'index.php?module=default&controller=order&action=renderPriceCheckout',
    data: {
      checkOutStorage:checkOutStorage,
      productsCart:productsCart,
      coupon_input: coupon_input
    },
    dataType: 'json',
    async:false,
    success: function(data) {
      if (data.msg == 'ok'){
        $('#checkout_table').html(data.checkOutContent);
        if(parseInt(data.promotion_cart) > 0 ){
          $('.cart_promotion').show();
        }
        $(".coupon_input").val(coupon_input);



      }
    }
  });






}
function delProduct(item){
  if(!confirm("The data is non-refundable. Are you sure you want to delete ?")) return false;
  let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];

  index = item.getAttribute('data-index');
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  renderProduct();
  if(products.length === 0)  window.location.reload();
}
function pricingProduct(index, number_product, unit_price_product) {
  price_product = format2(unit_price_product * number_product, "$");
  price_product_val = format2(unit_price_product * number_product, "");
  $(".total_price_product_text[data-index=" + index + "]").text(price_product);
  $(".total_price_product[data-index=" + index + "]").val(price_product_val);
  pricingTotalProducts();
}
function pricingTotalProducts() {
  var calculated_total_sum = 0;
  promotion = parseInt($('input[name="promotion"]').val());

  $(".cart_table .total_price_product").each(function () {
    var get_textbox_value = $(this).val();
    if ($.isNumeric(get_textbox_value)) {
      calculated_total_sum += parseFloat(get_textbox_value);
    }
  });

  $("#sub_total_products_text").text(format2(calculated_total_sum, "$"));
  $('input[name="sub_total_products"]').val(format2(calculated_total_sum, ""));
  if (promotion > 0) {
    calculated_total_sum = calculated_total_sum - (calculated_total_sum * promotion) / 100;
  }
  $("#price_total_products").text(format2(calculated_total_sum, "$"));
  $('input[name="price_total_products"]').val(format2(calculated_total_sum, ""));
}

function renderCart(){
  var dataCart = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
  if (dataCart.length >0){
    $.ajax({
      type: "POST",
      url: 'index.php?module=default&controller=order&action=renderCart',
      data: {dataCart:dataCart},
      dataType: 'json',
      success: function(data) {
        if (data.msg == 'ok'){
          $('.product_cart_header').html(data.renderCartHtml);
          $('.empty_cart_header').hide();
          $('.hidden__cart').removeClass('empty');
          $('.total__cart').text(data.total_products);
          $('.total_price_cart').text(data.total_price_cart);
        }
      }
    });
  }else{
    $('.empty_cart_header').show();
  }
}
renderCart();
function getFormData($form) {
  var unindexed_array = $form.serializeArray();
  var indexed_array = {};

  $.map(unindexed_array, function (n, i) {
    indexed_array[n["name"]] = n["value"];
  });

  return indexed_array;
}
function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

window.addEventListener('load', function() {
  // Get the forms we want to add validation styles to
  var forms = document.getElementsByClassName('needs-validation');
  // Loop over them and prevent submission
  var validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener('submit', function(event) {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
}, false);
if (document.querySelector(".zoom__plus") !== null && items_img_product.length >0 ) {
  var openPhoto = function() {
    var pswpElement = document.querySelectorAll('.pswp')[0];
  
    // build items array

  
    // define options (if needed)
    var options = {
        // optionName: 'option value'
        // for example:
        index: 0 // start at first slide
    };
  
    // Initializes and opens PhotoSwipe
    var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items_img_product, options);
    gallery.init();
  }
  
  document.getElementsByClassName('zoom__plus')[0].onclick = openPhoto;
}


// modal
$('.btnModalProduct').click(function (){
  var id = $(this).attr('data-id');
  var url = '/jobaria/index.php?module=default&controller=index&action=info';
  $('.hereModal').load(url , { id: id }, function (data){
      var main = new Splide(".splide_modal", {
        type: "fade",
        fixedHeight: 250,
        padding: '1rem',
        rewind: true,
        pagination: false,
        arrows: false,
      });

      var thumbnails = new Splide(".thumbnail_splide_modal", {
        fixedWidth: 90,
        rewind: true,
        pagination: false,
        focus: "center",
        arrows: false,
        isNavigation: true,
      });

      main.sync(thumbnails);
      main.mount();
      thumbnails.mount();
      $('#modal_product').modal();
  })
});

$('.criterions_list .fa-star').hover(function() {
      var idexCurrent = $(this).index();
      var i;
      var parent = $(this).parent();
      var len = parent.find('.fa-star').length;
      // parent.css({ color: '#909090' });
      for (i = 0; i < len; i++) {
        parent.find('.fa-star').eq(i).css({ color: '#909090' }).removeAttr('data-star', idexCurrent);
      }

      for (i = 0; i <= idexCurrent; i++) {
        parent.find('.fa-star').eq(i).css({ color: '#343a40' })
      }
      $('#rating').val(idexCurrent + 1);
});
// $('.btnReviewSubmit').click(function (){
//
//   $('#id_new_comment_form').submit();
// });

$('.input__search').keyup(function (){
  var val   = $(this).val();
  var url   = '/jobaria/index.php?module=default&controller=header&action=productSearch';
  var data  = {keyword: val};
  setTimeout(function (){
      $('.search-product-list').load(url, data);
  }, 500);
});
$('.btn__favorite').click(function (){
  var url   = '/jobaria/index.php?module=default&controller=user&action=addToFavorites';
  var id    = $(this).attr('data-id');
  var data  = {id: id};
  $.post(url, data, function (data, status){
      if (data == 'error')
        alert('Bạn chưa đăng nhập');
      else {
        let options = {
          position: 'top-right',
          animationDuration: 300
        };
        new AWN(options).modal('<b>Bạn đã thêm thành công.</b>');
      }
  });
});

