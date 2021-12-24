<?php
$product_order = $this->product_order;
$list_items = '';
if (!empty($product_order)){
    foreach ($product_order as $k=>$v){
        $list_items .='
            <tr>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="mr-3">
                            <img src="'.$v['image'].'" alt="product-img" height="40">
                        </div>
                        <div class="flex-1">
                            <h5 class="m-0">'.$v['product_name'].'</h5>
                            <p class="mb-0">Size : '.$v['size'].'</p>
                        </div>
                    </div>
                </td>
                <td>'.$v['quantity'].'</td>
                <td>$'.$v['price'].'</td>
                <td>$'.number_format($v['price']*$v['quantity'], 2, '.', ',').'</td>
            </tr>
        ';
    }
}

$shipping_address_block = '';
if($this->result['ship_defferent_address'] == 1){
    $shipping_address = json_decode($this->result['shipping_address'],true);
    if (!empty($shipping_address)){
        $shipping_address_block = '
        <div class="col-lg-4">
            <div>
                <h4 class="font-15 mb-2">Shipping Information</h4>
    
                <div class="card p-2 mb-lg-0">
    
                    <table class="table table-borderless table-sm mb-0">
    
                        <tbody>
                        <tr>
                            <th colspan="2"><h5 class="font-15 m-0">'.$shipping_address['first_name'].' '.$shipping_address['last_name'].'</h5></th>
                        </tr>
                        <tr>
                            <th scope="row">Address:</th>
                            <td>'.$shipping_address['address'].'</td>
                        </tr>
                        <tr>
                            <th scope="row">Phone :</th>
                            <td>'.$shipping_address['phone'].'</td>
                        </tr>
                        <tr>
                            <th scope="row">Email :</th>
                            <td>'.$shipping_address['email'].'</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    ';
    }

}
?>
<nav aria-label="breadcrumb" class="nav_breadcrumb">
    <div class="container">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="jobaria/">Home</a></li>
            <li class="breadcrumb-item"><a href="/order-history">Order history</a></li>
            <li class="breadcrumb-item active" aria-current="page">Order detail</li>
        </ol>
    </div>

</nav>
<section class="main_page main_page_order_detail mb-5">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header border-bottom bg-transparent">
                        <h5 class="header-title mb-0">Order <?php echo $this->result['code'] ?></h5>
                    </div>
                    <div class="card-body">
                        <div>
                            <div class="row">
                                <div class="col-lg-3 col-sm-6">

                                    <div class="d-flex mb-2">
                                        <div class="me-2 align-self-center">
                                            <i class="ri-hashtag h2 m-0 text-muted"></i>
                                        </div>
                                        <div class="flex-1">
                                            <p class="mb-1">ID No.</p>
                                            <h5 class="mt-0">
                                                <?php echo $this->result['code'] ?>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-sm-6">

                                    <div class="d-flex mb-2">
                                        <div class="me-2 align-self-center">
                                            <i class="ri-user-2-line h2 m-0 text-muted"></i>
                                        </div>
                                        <div class="flex-1">
                                            <p class="mb-1">Billing Name</p>
                                            <h5 class="mt-0">
                                                <?php echo $this->result['first_name'].' '.$this->result['last_name'] ?>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-sm-6">

                                    <div class="d-flex mb-2">
                                        <div class="me-2 align-self-center">
                                            <i class="ri-calendar-event-line h2 m-0 text-muted"></i>
                                        </div>
                                        <div class="flex-1">
                                            <p class="mb-1">Date</p>
                                            <h5 class="mt-0">
                                                <?php echo $this->result['created_at'] ?>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-sm-6">

                                    <div class="d-flex mb-2">
                                        <div class="me-2 align-self-center">
                                            <i class="ri-map-pin-time-line h2 m-0 text-muted"></i>
                                        </div>
                                        <div class="flex-1">
                                            <p class="mb-1">Tracking ID</p>
                                            <h5 class="mt-0">
                                                <?php echo $this->result['id'] ?>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-2">
                            <h4 class="header-title mb-3">Items from Order <?php echo $this->result['code'] ?></h4>
                            <div class="row">
                                <div class="col-lg-8">
                                    <div>
                                        <div class="table-responsive">
                                            <table class="table table-centered border table-nowrap mb-lg-0">
                                                <thead class="bg-light">
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                    <th>Total</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <?php echo $list_items ?>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-4">
                                    <div>

                                        <div class="table-responsive">
                                            <table class="table table-centered border mb-0">
                                                <thead class="bg-light">
                                                <tr>
                                                    <th colspan="2">Order summary</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <th scope="row">Sub Total :</th>
                                                    <td>$<?php echo $this->result['sub_total'] ?></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Shipping Charge :</th>
                                                    <td>Free</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Estimated Tax :</th>
                                                    <td>Free</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Total :</th>
                                                    <td>$<?php echo $this->result['total'] ?></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <!-- end card -->

                <div class="row mb-3">
                    <?php echo $shipping_address_block ?>
                    <div class="col-lg-4 ">
                        <div>
                            <h4 class="font-15 mb-2">Billing  Information</h4>

                            <div class="card p-2 mb-lg-0">
                                <table class="table table-borderless table-sm mb-0">

                                    <tbody>
                                    <tr>
                                        <th scope="row">Payment Type:</th>
                                        <td>Credit Card</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Provider :</th>
                                        <td>Visa ending in 2851</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Valid Date :</th>
                                        <td>02/2021</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">CVV :</th>
                                        <td>xxx</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 ">
                        <div>
                            <h4 class="font-15 mb-2">Delivery Info</h4>

                            <div class="card p-2 mb-lg-0">
                                <div class="text-center">
                                    <div class="my-2">
                                        <i class="fas fa-truck h1 text-muted"></i>
                                    </div>
                                    <h5 class="mb-0"><b>UPS Delivery</b></h5>
                                    <div class="pt-1">
                                        <p class="mb-1"><span class="fw-semibold">Order ID :</span> xxxx048</p>
                                        <p class="mb-0"><span class="fw-semibold">Payment Mode :</span> COD</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <!-- end row -->
    </div> <!-- container -->
</section>
