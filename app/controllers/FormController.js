var $ = require('jquery');
var _ = require('lodash');

module.exports = function($scope, $http) {
    var objArr = [
        {
            data: "ONE GET ONE FREE QUARTER POUNDER W/CHEESE OR EGG MCMUFFIN Go to wwwjcdvoice.com within 7 days and tell us about your visit. Validation Code:__ Expires 30 days after receipt date. Valid at participating US McDonald's 1120 MILLER PARKWAY MILWAUKEE WI 53215 ! ! i THANK YOU ! ! ! TEL# 414 647 8434 Storett 26303 KS» 13 Feb.25'16 (Thu) 08:03 MFY SIDE 1 KVS Order 98 QTY Tax McDonald's Restaurant TOTAL 1 Sau Egg McMuff Ml-Hb 4.39 1 L Coffee 0.29 ADD 5 Cream ADD 5 Sugar Subtotal 4.68 0.29 Take-Out Total 4.97 Cashless 4.97 Change 0.00 MERtt 47917202 CARD ISSUER ACCOUNT* Visa SALE *****+****+*4825 AUTHORIZATION CODE - 051315 SEQ# 506141"
        },
        {
            data: "Walmart s!c\nSave money. Live better.\nC813) 932-0562\nManager COLLEEN BRICKEY\n8885 N FLORIDA AVE\nTAMPA FL 33604\nST» 5221 0P» 00001061 TE» 06 TR# 05332\nBREAD 007225003712 F 2.88 N\nBREAD 007225003712 F 2.88 N\nGV PNT BUTTR 007874237003 F 3.84 N\nGV PNT BUTTR 007874237003 F 3.84 N\nGV PNT BUTTR 007874237003 F 3.84 N\nGV PNT BUTTR 007874237003 F 3.84 N\nGV PARM 160Z 007874201510 F 4.98 0\nGV CHNK CHKN 007874206784 F 1.98 N\nGV CHNK CHKN 007874206784 F 1.98 N\n12 CT NITRIL 073191913822 2.78 X\nFOLGERS        002550000377 F 10.48 N\nSC TUIST UP   007874222682 F 0.84 X\nEGGS 060538871459 F 1.88 SUBTOTAL 46.04 TAX 1     7.000 X 0.26 TOTAL 46.30 DEBIT   TEND 46.30\nCHANGE DUE 0.00\nEFT DEBIT PAY FROM PRIMARY\nACCOUNT : 5259\n46.30   TOTAL PURCHASE\nPAYMENT DECLINED DEBIT NOT AVAILABLE\n11/06/11 02:21:54\nEFT DEBIT PAY FROM PRIMARY\nACCOUNT : 5259\n46.30   TOTAL PURCHASE\nREF 9 131000195280\nNETWORK ID. 0071 APPR CODE 297664\n11/06/11 02:22:54\nIt ITEMS SOLD 13\nTC# 0432 2121 1542 2401 9590\nLayaway Is back for Electronics.\nToys, and Jewelry. 10/17/11-12/16/11\n11/06/11 02:22:59\n"
        },
        {
            data: "AEROPOSTALE flEROPOSTALE Prime Outlets at Pleasant Frairie Kenosha, UI 53158 Telephone: 2628576536 SALE Salesperson No. 852459 96362014 FLRL PRINT 19 CROP Final Return Price:$10.00 Discount: 96361328 A/0 P3LY MITI LEGGIN Final Return Price:$10.00 Discount: $10.00 ($29.50) $10.00 ($34.50) Subtotal TAXABLE 5.5000y. Total $20.00 $1 .10 $21.10 Discover Card No. XXXXXXXXXXXX3896 Auth. No. 01444P $21.10 Please Retain for Your Records Store: 00509 Reg: 02 Iran: 134667 Date: 2/14/2016 7:09:21 PM Assoc: 849318 Item(s) Sold: 2 IVemCs) Returned: 0 Thank jou for shopping at AER0P0STALE You have until 04/14/P01A c rs"
        }
    ];
    $scope.count = 0;

    $scope.upload = function () {
        if ($('#upload-menu').is(':hidden')) {
            $('#upload-menu').show(function () {
                $('#loading-overlay').addClass('anim');
                $('.happy').addClass('anim');
            });
        } else {
            $('#loading-overlay').removeClass('anim');
            $('.happy').removeClass('anim');
            setTimeout(function(){
                $('#upload-menu').hide('slow');
            }, 100);
        }
    };

    $scope.loading = function () {
        $('#loading').toggle();
    };

    $scope.processForm = function() {
        $scope.loading();
        var file = $scope.file;
        console.log('file is ');
        console.dir(file);

        var uploadUrl = 'http://api.ocrapiservice.com/1.0/rest/ocr';

        var fd = new FormData();
        fd.append('image', file);

        var formData = {
            language: 'en',
            apikey: 'CZhnJLtjwL'
        };

        _.forOwn(formData, function(value, key) {
            fd.append(key, value);
        });

        setTimeout($scope.populateForm(objArr), 2000);

        $scope.count++;

        // $http.post(uploadUrl, fd, {
        //     transformRequest: angular.identity,
        //     headers: { 'Content-Type': undefined }
        // })
        // .success(function(data) {
        //     console.log(data);
        //     $scope.populateForm(data);
        // })
        // .error(function(err) {
        //     console.log(err);
        // });
    };

    $scope.populateForm = function(data) {
        data = data[$scope.count];
        // var str = data.toString();

        // var strArr = str.split('\n');

        var uploadUrl = 'http://52.90.38.61:3004/jsonify';

        // var fd = {
        //     data: str
        // };

        $.post('http://52.90.38.61:3004/jsonify', data)
        .success(function(data) {
            $scope.loading();
            $scope.upload();
            console.log(data);
            _.forOwn(data, function (value, key) {
                key = '.' + key;
                $(key).text(value);
            });
        })
        .error(function(err) {
            $scope.loading();
            $scope.upload();
            console.log(err);
        });
    };
};
