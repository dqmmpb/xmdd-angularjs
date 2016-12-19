'use strict';

angular.module('starter.controllers', [])

.controller('BaseCtrl', function($scope, $window, $http, $document, $location, $storage, $bases) {
    var locationHref = $window.location.href;
    if(locationHref.indexOf('?rc=') !== -1){
      var rc = locationHref.substring(locationHref.indexOf('?rc=') + 4);
      $storage.addItem('rc', rc);
    }

  $scope.baseInfo = {
    abcRc: $storage.getItem('rc'),
    cellphone: null, //手机号
    cardType: null, //卡片类型
    name: null,  //姓名
    maritalStatus: null,  //婚姻状况
    income: null, //个人年收入
    idcardNo: null, //身份证号
    idcardAddr: null, //身份证地址
    propertyStatus: null, //住房状况
    installment: null, //月还款
    sameas: null, //与身份证相同
    houseAddr: '浙江省杭州市' //家庭地址
  };

  $scope.cardTypes = $bases.allCardTypes();
  $scope.maritalStatuses = $bases.allMaritalStatuses();
  $scope.propertyStatuses = $bases.allPropertyStatuses();

  $scope.$watch('baseInfo.idcardNo', function(newValue, oldValue) {
    if(newValue && oldValue && newValue !== oldValue) {
       $scope.baseInfo.idcardNo = newValue.toUpperCase();
    }
  });

  var info = $storage.getItem('base');

  if(typeof info !== 'undefined')
    $scope.baseInfo = info;

  $scope.idcardAddrChange = function(){
      var flag = $scope.baseInfo.sameas;
      if(flag) {
        $scope.baseInfo.houseAddr = $scope.baseInfo.idcardAddr;
/*        if(/^浙江省杭州市/.test($scope.baseInfo.idcardAddr)) {
          $scope.baseInfo.houseAddr = $scope.baseInfo.idcardAddr;
        } else {
          $scope.baseInfo.houseAddr = $scope.baseInfo.idcardAddr;
        }*/
      } else {
        /*$scope.baseInfo.houseAddr = '浙江省杭州市';*/
      }
  };

  $scope.propertyStatusChange = function(){
      var flag = $scope.baseInfo.propertyStatus === '自购有贷款房';
  };

  $scope.sameAsChange = function(){
      var flag = $scope.baseInfo.sameas;
      if(flag) {
        $scope.baseInfo.houseAddr = $scope.baseInfo.idcardAddr;
        /*if(/^浙江省杭州市/.test($scope.baseInfo.idcardAddr)) {
          $scope.baseInfo.houseAddr = $scope.baseInfo.idcardAddr;
        } else {
          $scope.baseInfo.houseAddr = $scope.baseInfo.idcardAddr;
        }*/

      } else {
        /*$scope.baseInfo.houseAddr = null;*/
       /* $scope.baseInfo.houseAddr = '浙江省杭州市';*/
        $scope.baseInfo.houseAddr = '浙江省杭州市';
      }
  };

  // function to submit the form after all validation has occurred
  $scope.submitForm = function(isValid) {

    // check to make sure the form is completely valid
    if (isValid) {
      $scope.baseInfo.idcardNo = $scope.baseInfo.idcardNo.toUpperCase();
      $storage.addItem('base', $scope.baseInfo);
      $location.path('step/company');
    }
  };

})
.directive('idcard',function($idcard){
    return {
        restrict:'A',
        require:'ngModel',
        link:function(scope, elm, attr, ctrl){


            ctrl.$validators.idcard = function(modelValue, viewValue) {
                var pass = true;
                var code = viewValue;
                if(code) {
                  code = code.toUpperCase();
                }

                pass = $idcard.idCardCheck(code);

/*                if(!pass) {
                  ctrl.$setValidity('idcard',false);
                } else {
                  ctrl.$setValidity('idcard',true);
                }*/
                return pass;
            };

            attr.$observe('idcard', function() {
              ctrl.$validate();
            });
        }
    };
})

.controller('CompanyCtrl', function($scope, $window, $http, $document, $location, $contacts, $storage) {

  $scope.companyInfo = {
    companyName: null, //单位名称
    companyAddr: null, //单位地址
    companyTel: null,  //单位电话
    contactsName: null,  //联系人姓名
    contactsRel: null, //联系人关系
    contactsGender: null, //联系人性别
    contactsTel: null //联系人电话
  };

  $scope.contactsRels = $contacts.allRels();
  $scope.contactsGenders = $contacts.allGenders();

  $scope.getFormStatus = function(){
    console.log($scope.form);
  };

  var info = $storage.getItem('company');

  if(typeof info !== 'undefined')
    $scope.companyInfo = info;

  $scope.baseInfo = $storage.getItem('base');

  // function to submit the form after all validation has occurred
  $scope.submitForm = function(isValid) {

    // check to make sure the form is completely valid
    if (isValid) {
      $storage.addItem('company', $scope.companyInfo);
      $location.path('step/network');
    }
  };

})

.directive('sameasname',function(){
    return {
        restrict:'A',
        require:'ngModel',
        link:function(scope, elm, attr, ctrl){

            ctrl.$validators.sameasname = function(modelValue, viewValue) {
                var pass = true;
                pass = viewValue !== scope.baseInfo.name;

               /* if(!pass) {
                  ctrl.$setValidity('sameasname',false);
                } else {
                  ctrl.$setValidity('sameasname',true);
                }*/
                return pass;
            };

            attr.$observe('sameasname', function() {
              ctrl.$validate();
            });
        }
    };
})
.directive('sameascellphone',function(){
    return {
        restrict:'A',
        require:'ngModel',
        link:function(scope, elm, attr, ctrl){

            ctrl.$validators.sameascellphone = function(modelValue, viewValue) {
                var pass = true;
                pass = viewValue !== scope.baseInfo.cellphone;

/*                if(!pass) {
                  ctrl.$setValidity('sameascellphone',false);
                } else {
                  ctrl.$setValidity('sameascellphone',true);
                }*/
                return pass;
            };

            attr.$observe('sameascellphone', function() {
              ctrl.$validate();
            });
        }

    };
})
.directive('single',function(){
    return {
        restrict:'A',
        require:'ngModel',
        link:function(scope, elm, attr, ctrl){

/*            ctrl.$parsers.push(function(viewValue) {
                var pass = true;
                pass = !(viewValue == '配偶' && scope.baseInfo.maritalStatus == '未婚' );

                if(!pass) {
                  ctrl.$setValidity('single',false);
                } else {
                  ctrl.$setValidity('single',true);
                }
                return viewValue;
            });*/

            if (!ctrl) return;
            attr.single = true; // force truthy in case we are on non input element

            attr.$observe('single', function(value) {
              ctrl.$validate();
            });

            ctrl.$validators.single = function(modelValue, viewValue) {
              return !attr.single || !(viewValue === '配偶' && scope.baseInfo.maritalStatus === '未婚');
            };
/*            attr.$observe('single', function() {
              ctrl.$validate();
            });*/


        }
    };
})
.directive('gender',function($idcard){
    return {
        restrict:'A',
        require:'ngModel',
        link:function(scope, elm, attr, ctrl){


            if (!ctrl) return;
            attr.gender = true; // force truthy in case we are on non input element

            attr.$observe('gender', function(value) {
              ctrl.$validate();
            });

            attr.$observe('contactsrel', function(value) {
              ctrl.$validate();
            });

            ctrl.$validators.gender = function(modelValue, viewValue) {
              var gender = $idcard.idCardGender(scope.baseInfo.idcardNo);
              attr.gender = (scope.baseInfo.maritalStatus === '已婚有子女' || scope.baseInfo.maritalStatus === '已婚无子女') && scope.companyInfo.contactsRel === '配偶' && viewValue === gender;
              return (typeof gender !== 'undefined') && !attr.gender;
            };


        }
    };
})

.controller('NetworkCtrl', function($scope, $window, $http, $document, $location, $networks, $storage) {

  $scope.networkInfo = {
    district: null, // 地区
    net: null, //网点
    billType: '电子账单',  //账单类型
    email: null, //邮箱地址
    agree: null,  //协议条款
    token: null, //Token
    vcode: null
  };

  $scope.nets = $networks.allNets();
  $scope.districts = $networks.allDistricts();
  $scope.billTypes = $networks.allBillTypes();

  var info = $storage.getItem('network');

  if(typeof info !== 'undefined')
    $scope.networkInfo = info;

  $scope.networkInfo.vcode = null;
  $storage.addItem('network', $scope.networkInfo);

  $scope.licenseXykzc = function() {

    $storage.addItem('network', $scope.networkInfo);

    $location.path('step/xykzc');
  };

  $scope.licenseLyhy = function() {

    $storage.addItem('network', $scope.networkInfo);

    $location.path('step/lyhy');
  };
  // function to submit the form after all validation has occurred
  $scope.submitForm = function(isValid) {

    // check to make sure the form is completely valid
    if (isValid) {
      $storage.addItem('network', $scope.networkInfo);

      var baseInfo = $storage.getItem('base');
      var companyInfo = $storage.getItem('company');
      var networkInfo = $storage.getItem('network');


      var applyInfo = {

      };
      applyInfo.abcRc = baseInfo.abcRc;
      applyInfo.cellphone = baseInfo.cellphone;
      applyInfo.cardType = baseInfo.cardType;
      applyInfo.name = baseInfo.name;
      applyInfo.maritalStatus = baseInfo.maritalStatus;
      applyInfo.income = baseInfo.income;
      applyInfo.idcardNo = baseInfo.idcardNo;
      applyInfo.idcardAddr = baseInfo.idcardAddr;
      applyInfo.propertyStatus = baseInfo.propertyStatus;

      if(baseInfo.propertyStatus === '自购有贷款房')
        applyInfo.installment = baseInfo.installment;

      applyInfo.houseAddr = baseInfo.houseAddr;

      applyInfo.companyName = companyInfo.companyName;
      applyInfo.companyAddr = companyInfo.companyAddr;
      applyInfo.companyTel = companyInfo.companyTel;
      applyInfo.contactsName = companyInfo.contactsName;
      applyInfo.contactsRel = companyInfo.contactsRel;
      applyInfo.contactsGender = companyInfo.contactsGender;
      applyInfo.contactsTel = companyInfo.contactsTel;

      applyInfo.net = networkInfo.net;
      applyInfo.district = networkInfo.district.d;
      applyInfo.billType = networkInfo.billType;
      applyInfo.token = networkInfo.token;
      applyInfo.vcode = networkInfo.vcode;

      if(networkInfo.billType === '电子账单')
        applyInfo.email = networkInfo.email;

      applyInfo.agree = networkInfo.agree;

      $http.post('/paaweb/abc/card/apply/process', applyInfo)
      .success(function(data, status, headers, config) {
          //成功之后做一些事情
        if(!data.success){
          if(data.message){
            alert(data.message);
          } else {
            alert('提交失败，请重试');
          }
        } else {
          $location.path('step/result');
          $storage.removeItem('base');
          $storage.removeItem('company');
          $storage.removeItem('network');
          $storage.removeItem('rc');
        }
      }).error(function(data, status, headers, config) {
        //处理错误
        alert('网络异常，请重试');
      });
    }
  };


  var tempBaseInfo = $storage.getItem('base');
  $scope.baseInfo = tempBaseInfo;
  $scope.counter = null;

  // 定义计时器
  function Timer(countdown, obj, disabled) {
    this.countdown = countdown;
    this.count = this.countdown;
    this.obj = obj;
    this.intervalId = null;
    this.counting = false;
    this.disabled = disabled ? disabled : false;
  }

  Timer.prototype.setTime = function() {
    if (this.count === 0) {
      this.counting = false;
      return this.clear();
    } else {
      if(!this.disabled) {
        this.obj.attr('disabled', true);
        this.obj.addClass('disabled');
        this.obj.text('重新发送(' + this.count + ')');
        this.count--;
      } else {
        this.obj.attr('disabled', true);
        this.obj.addClass('disabled');
      }
    }
    return this;
  };

  Timer.prototype.start = function() {
    var thiz = this;
    this.counting = true;
    this.intervalId = setInterval(function() { thiz.setTime(); }, 1000);
    return this;
  };

  Timer.prototype.clear = function() {

    if(!this.disabled && !this.counting) {
      this.obj.removeAttr('disabled');
      this.obj.removeClass('disabled');
    }
    this.obj.text('获取验证码');
    this.count = this.countdown;
    this.counting = false;
    clearInterval(this.intervalId);
    return this;
  };

  // 获取验证码
  $scope.getVCode = function($event) {
    var obj = $event.target;
    if(/^1[0-9]{10}$/.test($scope.baseInfo.cellphone)) {
      $scope.counter = new Timer(60, $(obj));
      $scope.counter.setTime().start();
      $http({
        method: 'POST',
        url: '/paaweb/abc/card/apply/token/get',
        data: {
          phone: $scope.baseInfo.cellphone
        },
        async: false
      }).success(function(respData, respStatus, respHeaders, respConfig) {
        if(respData.success === true) {
          $scope.networkInfo.token = respData.token;
          $storage.addItem('network', $scope.networkInfo);

          $http({
            method: 'POST',
            url: '/paaweb/abc/card/apply/vcode/get',
            data: {
              token: respData.token
            },
            async: false
          }).success(function(data, status, headers, config) {
            if(data.success === true) {
              //alert('验证码发送成功');
            } else {
              alert('获取验证码失败，请重试');
              if($scope.counter)
                $scope.counter.clear();
            }
          }).error(function(data, status, headers, config) {
            //处理错误
            alert('获取验证码失败，请重试');
            if($scope.counter)
              $scope.counter.clear();
          });
        } else {
          alert('获取验证码失败，请重试');
          if($scope.counter)
            $scope.counter.clear();
        }
      }).error(function(respData, respStatus, respHeaders, respConfig) {
        //处理错误
        alert('获取验证码失败，请重试');
        if($scope.counter)
          $scope.counter.clear();
      });

    } else {
      alert('请使用正确的手机号');
    }
  };

})
.directive('netneed',function(){
    return {
        restrict:'A',
        require:'ngModel',
        link:function(scope, elm, attr, ctrl){

            ctrl.$validators.netneed = function(modelValue, viewValue) {
                var pass = true;
                pass = !(viewValue === '');

               /* if(!pass) {
                  ctrl.$setValidity('netneed',false);
                } else {
                  ctrl.$setValidity('netneed',true);
                }*/
                return pass;
            };

            attr.$observe('netneed', function() {
              ctrl.$validate();
            });

        }
    };
})

.controller('SubmitCtrl', function($scope, $window, $http, $document, $location) {
});
