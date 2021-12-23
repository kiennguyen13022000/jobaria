<?php

class ChatController extends Controller
{
    public function indexAction(){
        $this->_view->title = 'Chat';
        $this->createLinkCss();
        $this->createLinkJs();
        $this->_view->control = $this->_arrParam['controller'];
        $this->_view->render('chat/index');
    }
    private function createLinkCss(){
        $css = array(

            array(
                'link' => 'public/template/admin/images\custom\favicon.ico',
                'type' => '',
                'rel'  => 'shortcut icon'
            ),
            array(
                'link' => 'public/template/admin\libs\sweetalert2\sweetalert2.min.css',
                'type' => '',
                'rel'  => 'stylesheet'
            ),
            array(
                'link' => 'public/template/admin/css/bootstrap.min.css',
                'type' => 'text/css',
                'rel'  => 'stylesheet'
            ),
            array(
                'link' => 'public/template/admin/css/icons.min.css',
                'type' => 'text/css',
                'rel'  => 'stylesheet'
            ),
            array(
                'link' => 'public/template/admin/css/app.min.css',
                'type' => 'text/css',
                'rel'  => 'stylesheet'
            ),
            array(
                'link' => 'public/template/admin/css/chat.css',
                'type' => 'text/css',
                'rel'  => 'stylesheet'
            )
        );

        $link = '';

        foreach ($css as $key => $value){
            $link .= '<link href="'. $value['link'] .'" rel="'. $value['rel'] .'" type="'. $value['type'] .'">';
        }

        $this->_view->linkCss = $link;
    }
    private function createLinkJs(){

        $css = array(
            array(
                'link' => 'public/template/admin/js\vendor.min.js',
            ),
            array(
                'link' => 'public/template/admin/libs/moment\moment.min.js',
            ),
            array(
                'link' => 'public/template/admin/libs\jquery-scrollto\jquery.scrollTo.min.js',
            ),
            array(
                'link' => 'public/template/admin/libs\sweetalert2\sweetalert2.min.js',
            ),
            array(
                'link' => 'public/template/admin/libs\jquery-sparkline\jquery.sparkline.min.js',
            ),
            array(
                'link' => 'public/template/admin/libs\jquery-knob\jquery.knob.min.js',
            ),
            array(
                'link' => 'public/template/admin/js\pages\jquery.chat.js',
            ),
            array(
                'link' => 'public/template/admin/js\pages\jquery.todo.js',
            ),
            array(
                'link' => 'public/template/admin/js\pages\widgets.init.js',
            ),
            array(
                'link' => 'public/template/admin/js\app.min.js',
            ),
            array(
                'link' => 'public/template/admin/js\chat.js',
            )
        );

        $link = '';
        foreach ($css as $key => $value){
            $link .= '<script src="'. $value['link'] .'"></script>';
        }

        $this->_view->linkJs = $link;
    }
}