<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="css/prettyPhoto.css">    

        <!--<style type="text/css" media="screen">
            .bsap a {
                float: left;
            }
        </style>-->
    </head>
    <body>
       
        <div class="container">
            <div style="width:280px;height:80px;background:grey;opacity:0.2;border-radius:9px;position:absolute;margin-left:460px;margin-top:79px;"></div>
            <div style="position:absolute;margin-left:635px;margin-top:85px;z-index:3;">
                <a href="#?custom=true&width=640&height=480" rel="prettyPhoto"><img src="http://icons.iconarchive.com/icons/alecive/flatwoken/512/Apps-Google-Maps-icon.png" width=58px>
                </a>
            </div>
            <p style="position:absolute;margin-left:500px;margin-top:109px;color:#6c4949;font-size:20px;font-family:'raleway';">Ver no mapa</p>
        </div>

        <script src="js/jquery.js"></script>    
        <script src="js/jquery.prettyPhoto.js" type="text/javascript" charset="utf-8"></script>
          
        <!--<script type="text/javascript">
        (function(){
          var bsa = document.createElement('script');
             bsa.type = 'text/javascript';
             bsa.async = true;
             bsa.src = 'js/bsa.js';
          (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(bsa);
        })();
        </script>-->
           
        <script type="text/javascript">
            $(document).ready(function () {
                $("a[rel^='prettyPhoto']").prettyPhoto({
                    custom_markup: '<iframe src="https://www.google.com/maps/d/embed?mid=zrjya5AGm7qQ.k7_Al2mxJlUo" width="640" height="470"></iframe>',
                });
            });
        </script>
    </body>
</html>