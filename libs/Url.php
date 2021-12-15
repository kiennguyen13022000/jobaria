<?php
class URL
{

    public static function createLink($module, $controller, $action, $param = null)
    {
        $link = '';
        if (!empty($param)) {
            foreach ($param as $key => $item) {
                $link .= '&' . $key . '=' . $item;
            }
        }
        $url = 'index.php?module=' . $module . '&controller=' . $controller . '&action=' . $action . $link;
       
        return $url;
    }
    public static function redirect($module, $controller, $action, $param = null, $router = null)
    {
        $link = self::createLink($module, $controller, $action, $param, $router);
        header('location: ' . $link . '');
        exit();
    }

    private function removeSpace($value)
    {
        $value = trim($value);
        $value = preg_replace('#(\s)+#', ' ', $value);
        return $value;
    }

    private function replaceSpace($value)
    {
        $value = trim($value);
        $value = preg_replace('#\s+#', '-', $value);
        $value = preg_replace('#(-)+#', '-', $value);
        return $value;
    }

    private function removeCircumflex($value)
    {
        /*a à ả ã á ạ ă ằ ẳ ẵ ắ ặ â ầ ẩ ẫ ấ ậ b c d đ e è ẻ ẽ é ẹ ê ề ể ễ ế ệ
        f g h i ì ỉ ĩ í ị j k l m n o ò ỏ õ ó ọ ô ồ ổ ỗ ố ộ ơ ờ ở ỡ ớ ợ
        p q r s t u ù ủ ũ ú ụ ư ừ ử ữ ứ ự v w x y ỳ ỷ ỹ ý ỵ z*/
        $value = mb_strtolower($value);

        $characterA = '#(a|à|ả|ã|á|ạ|ă|ằ|ẳ|ẵ|ắ|ặ|â|ầ|ẩ|ẫ|ấ|ậ)#imsU';
        $replaceA   = 'a';
        $value      = preg_replace($characterA, $replaceA, $value);

        $characterD = '#(đ|Đ)#ims';
        $replaceD   = 'd';
        $value      = preg_replace($characterD, $replaceD, $value);

        $characterE = '#(è|ẻ|ẽ|é|ẹ|ê|ề|ể|ễ|ế|ệ)#imsU';
        $replaceE   = 'e';
        $value      = preg_replace($characterE, $replaceE, $value);

        $characterI = '#(ì|ỉ|ĩ|í|ị)#imsU';
        $replaceI   = 'i';
        $value      = preg_replace($characterI, $replaceI, $value);

        $charaterO        = '#(ò|ỏ|õ|ó|ọ|ô|ồ|ổ|ỗ|ố|ộ|ơ|ờ|ở|ỡ|ớ|ợ)#imsU';
        $replaceCharaterO = 'o';
        $value            = preg_replace($charaterO, $replaceCharaterO, $value);

        $charaterU        = '#(ù|ủ|ũ|ú|ụ|ư|ừ|ử|ữ|ứ|ự)#imsU';
        $replaceCharaterU = 'u';
        $value            = preg_replace($charaterU, $replaceCharaterU, $value);

        $charaterY        = '#(ỳ|ỷ|ỹ|ý)#imsU';
        $replaceCharaterY = 'y';
        $value            = preg_replace($charaterY, $replaceCharaterY, $value);


        $charaterSpecial = '#(-&-)#imsU';
        $replaceSpecial  = '_';
        $value           = preg_replace($charaterSpecial, $replaceSpecial, $value);

        $charaterSpecial = '#(,)#imsU';
        $replaceSpecial  = '/';
        $value           = preg_replace($charaterSpecial, $replaceSpecial, $value);
        return $value;

    }

    public static function filterURL($value)
    {
        //$value = URL::removeSpace($value);
        $value = URL::replaceSpace($value);
        $value = URL::removeCircumflex($value);

        return $value;
    }

}