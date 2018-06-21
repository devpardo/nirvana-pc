webpackJsonp([12],{393:function(e,t,n){"use strict";function i(e){r||n(849)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(522),o=n(770),s=n(4),r=!1,l=i,d=n.i(s.a)(a.a,o.a,o.b,!1,l,"data-v-1feb0080",null);d.options.__file="src/views/Setting/Profile.vue",t.default=d.exports},408:function(e,t,n){"use strict";function i(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=null,i=[];return function(){for(var a=arguments.length,s=Array(a),r=0;r<a;r++)s[r]=arguments[r];return clearTimeout(n),n=setTimeout(function(){var t=e.apply(void 0,s);i.forEach(function(e){return e(t)}),i=[]},t),new o.a(function(e){return i.push(e)})}}n.d(t,"b",function(){return s}),n.d(t,"a",function(){return r}),n.d(t,"c",function(){return l}),t.d=i;var a=n(51),o=n.n(a),s=function(e){return/^[1-9]+[0-9]*]*$/.test(e)},r=function(e,t){if("email"===e){return/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(t)}if("mobile"===e){return/^1\d{10}$/.test(t)}if("name"===e){var n=t.toString().length;return n>=7&&n<=12}if("password"===e){var i=t.toString().length;return i>=6&&i<=12}if("bank"===e){return/^\d{16}|\d{19}$/.test(t)}},l=function(){var e=document.createElement("demo"),t={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(var n in t)if(void 0!==e.style[n])return t[n]}},475:function(e,t,n){"use strict";var i=n(28),a=n.n(i);t.a={props:["profile","updateProfile"],data:function(){return{mars:this.$fontawesome("mars"),venus:this.$fontawesome("venus"),check:this.$fontawesome("check"),current:this.profile.gender,sign:this.profile.desc,name:this.profile.realname,email:this.profile.email,mobile:this.profile.mobile,oldPassword:"",newPasswod:"",rePassword:"",passwordFlg:!1}},methods:{close:function(){this.profile.editFlag=!1},changeGender:function(e){this.current=e},ok:function(){this.profile.gender=this.current,this.profile.desc=this.sign,this.profile.realname=this.name,this.profile.email=this.email,this.profile.mobile=this.mobile,this.updateProfile(this.profile.editStyle),this.close()},logOut:function(){var e=this,t=a.a.get("accessToken");this.api.logOut(t).then(function(){e.$store.dispatch("removeUserInfo"),a.a.remove("accessToken"),e.$router.push({name:"Home"}),e.$store.dispatch("setLoginFlag",!0),e.$message({message:"已退出，请重新登录",type:"info"})}).catch(function(t){e.disabled=!1,console.log(t)})},verify:function(e){var t=e.length;return t?!(t<6||t>12)||(this.$message({message:"密码字数格式不对",type:"error"}),!1):(this.$message({message:"密码不能为空",type:"error"}),!1)},change:function(){var e=this;if(this.verify(this.newPasswod)&&this.verify(this.rePassword)&&this.verify(this.oldPassword)){if(this.newPasswod!==this.rePassword&&this.newPasswod)return void this.$message({message:"两次密码不一致",type:"error"});this.passwordFlg=!0;var t={current_password:this.oldPassword,password:this.newPasswod};this.api.updatePassword(t).then(function(){e.$message({message:"修改密码成功，请重新登录",type:"success"}),e.logOut()}).catch(function(t){e.passwordFlg=!1,e.$message({message:"修改密码失败",type:"error"}),console.log(t)})}}}}},480:function(e,t,n){"use strict";t.a={props:["upload","refresh"],data:function(){return{image:"",file:"",disabled:!1}},mounted:function(){this.fetchProfile()},methods:{close:function(){this.upload.flag=!1},fetchProfile:function(){var e=this;this.api.getProfile().then(function(t){e.image=t.data.aws_url})},fileSelected:function(e){var t=e.target.files||e.dataTransfer.files;if(t.length)return 1!==t.length?void this.$message({message:"请上传一张头像",type:"info"}):(this.file=t[0],this.image=window.URL.createObjectURL(t[0]),this.uploadAvatar(),void 0)},uploadAvatar:function(){var e=this;if(!this.file)return void this.$message({message:"请上传一张头像",type:"error"});var t=this.$message({message:"图片上传中...",type:"info",duration:0}),n={headers:{"Content-Type":"multipart/form-data"}},i=new FormData;i.append("file",this.file),this.disabled=!0,this.api.postUploadAvatar(i,n).then(function(){e.fetchProfile(),t.close(),e.$message({message:"上传图片成功",type:"success"}),e.close(),e.refresh(),e.disabled=!1}).catch(function(n){t.onClose(),e.disabled=!1,console.log(n)})}}}},482:function(e,t,n){"use strict";t.a={props:["verify","profile","fetchProfile"],data:function(){return{disabled:!1,submitDisabled:!0,code:"",count:60}},methods:{close:function(){this.verify.flag=!1},getEmailCode:function(){var e=this;this.disabled=!0,this.api.postEmailVerifyCode(this.profile.email).then(function(){e.$message({message:"已发送验证码，请注意查收",type:"info"})}).catch(function(){e.disabled=!1})},getMobileCode:function(){var e=this;this.disabled=!0;var t=setInterval(function(){0===--e.count&&(e.disabled=!1,e.count=60,window.clearInterval(t))},1e3);this.api.postMobileVerifyCode(this.profile.mobile).then(function(){e.$message({message:"已发送验证码，请注意查收",type:"info"})}).catch(function(){e.disabled=!1})},email:function(){var e=this;if(!this.code)return void this.$message({message:"验证码不能为空",type:"warning"});this.submitDisabled=!1,this.api.emailCreate(this.profile.email,this.code).then(function(){e.submitDisabled=!1,e.fetchProfile(),e.close(),e.$message({message:"邮箱验证成功",type:"success"})}).catch(function(){e.submitDisabled=!0})},mobile:function(){var e=this;if(!this.code)return void this.$message({message:"验证码不能为空",type:"warning"});this.submitDisabled=!1,this.api.mobileCreate(this.profile.mobile,this.code).then(function(){e.submitDisabled=!1,e.fetchProfile(),e.close(),e.$message({message:"手机号验证成功",type:"success"})}).catch(function(){e.submitDisabled=!0})}}}},522:function(e,t,n){"use strict";var i=n(11),a=n.n(i),o=n(10),s=n.n(o),r=n(28),l=n.n(r),d=n(742),p=n(744),f=n(737),c=n(135),u=n(408);t.a={data:function(){return{lock:this.$fontawesome("lock"),signOut:this.$fontawesome("sign-out"),edit:this.$fontawesome("edit"),check:this.$fontawesome("check"),pickerOptions0:{disabledDate:function(e){return e.getTime()>Date.now()-864e5}},upload:{flag:!1},verify:{flag:!1,number:""},profile:{editFlag:!1,editStyle:"",mobile:"",mobile_confirmed_at:"",email:"",email_confirmed_at:"",desc:"",photo:"",gender:"",birthday:"",realname:""},birthdayFlag:!1,realnameFlag:!1,loading:!1}},mounted:function(){this.fetchProfile()},components:{UploadFile:d.a,VerifyDialog:p.a,ProfileEdit:f.a},methods:{uploadFile:function(){this.upload.flag=!0},editProfile:function(e){this.profile.editStyle=e,this.profile.editFlag=!0},verifyInfo:function(e){this.test(e)&&(this.verify.number=e,this.verify.flag=!0)},test:function(e){if(5===e){if(!this.profile.email)return void this.$message({message:"邮箱不能为空",type:"warning"});if(!n.i(u.a)("email",this.profile.email))return void this.$message({message:"邮箱格式不对",type:"warning"})}else if(6===e){if(!this.profile.mobile)return void this.$message({message:"手机号不能为空",type:"warning"});if(!n.i(u.a)("mobile",this.profile.mobile))return void this.$message({message:"手机格式不对",type:"warning"})}return!0},refresh:function(){history.go(0)},fetchProfile:function(){var e=this;return s()(a.a.mark(function t(){var n;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e.loading=!0,t.next=4,e.api.getProfile();case 4:n=t.sent,e.profile.mobile=n.data.mobile,e.profile.email=n.data.email,e.profile.mobile_confirmed_at=n.data.mobile_confirmed_at,e.profile.email_confirmed_at=n.data.email_confirmed_at,e.profile.desc=n.data.desc,e.profile.username=n.data.username,e.profile.photo=n.data.aws_url,null!==n.data.gender&&(e.profile.gender=n.data.gender),e.profile.birthday=n.data.birthday,n.data.birthday&&(e.birthdayFlag=!0),e.profile.realname=n.data.realname,e.realnameFlag=!!n.data.realname,t.next=22;break;case 19:t.prev=19,t.t0=t.catch(0),console.log(t.t0);case 22:return t.prev=22,e.loading=!1,t.finish(22);case 25:case"end":return t.stop()}},t,e,[[0,19,22,25]])}))()},editInfo:function(e){if(4===e&&this.birthdayFlag)return void this.$message({message:"仅能编辑一次，不能再次编辑",type:"info"});var t="done"+e;"inline-block"===this.$refs[t].style.display?this.$refs[t].style.display="none":"none"===this.$refs[t].style.display&&(this.$refs[t].style.display="inline-block")},updateProfile:function(e){var t=this;return s()(a.a.mark(function i(){var o;return a.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:if(o={},3!==e){i.next=8;break}if(t.profile.desc){i.next=5;break}return t.$message({message:"签名不能为空",type:"warning"}),i.abrupt("return");case 5:o={desc:t.profile.desc},i.next=46;break;case 8:if(1!==e){i.next=15;break}if(t.profile.realname){i.next=12;break}return t.$message({message:"真实姓名不能为空",type:"warning"}),i.abrupt("return");case 12:o={realname:t.profile.realname},i.next=46;break;case 15:if(2!==e){i.next=19;break}o={gender:t.profile.gender},i.next=46;break;case 19:if(4!==e){i.next=26;break}if(t.profile.birthday){i.next=23;break}return t.$message({message:"出生日不能为空",type:"warning"}),i.abrupt("return");case 23:o={birthday:n.i(c.a)(t.profile.birthday,"yyyy-MM-dd")},i.next=46;break;case 26:if(5!==e){i.next=37;break}if(!t.profile.email||!t.profile.email_confirmed_at){i.next=32;break}return t.$message({message:"邮箱已验证，不能再次编辑",type:"info"}),i.abrupt("return");case 32:if(t.test(e)){i.next=34;break}return i.abrupt("return");case 34:o={email:t.profile.email},i.next=46;break;case 37:if(6!==e){i.next=46;break}if(!t.profile.mobile||!t.profile.mobile_confirmed_at){i.next=43;break}return t.$message({message:"手机号已验证，不能再次编辑",type:"info"}),i.abrupt("return");case 43:if(t.test(e)){i.next=45;break}return i.abrupt("return");case 45:o={mobile:t.profile.mobile};case 46:return t.loading=!0,i.prev=47,i.next=50,t.api.updateProfile(o);case 50:if(3!==e){i.next=54;break}t.refresh(),i.next=57;break;case 54:if(4!==e){i.next=57;break}return i.next=57,t.fetchProfile();case 57:return i.next=59,t.fetchProfile();case 59:t.$message({message:"信息保存完毕",type:"success"}),i.next=67;break;case 62:i.prev=62,i.t0=i.catch(47),4===e&&(t.profile.birthday=""),t.$message({message:"信息保存失败",type:"error"}),console.log(i.t0);case 67:return i.prev=67,t.loading=!1,i.finish(67);case 70:case"end":return i.stop()}},i,t,[[47,62,67,70]])}))()},logOut:function(){var e=this;return s()(a.a.mark(function t(){var n;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n=l.a.get("accessToken"),t.next=4,e.api.logOut(n);case 4:e.$store.dispatch("removeUserInfo"),l.a.remove("accessToken"),e.$router.push({name:"Home"}),e.$message({message:"已退出",type:"info"}),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(0),console.log(t.t0);case 13:case"end":return t.stop()}},t,e,[[0,10]])}))()}}}},547:function(e,t,n){t=e.exports=n(2)(!1),t.push([e.i,"\n.overflow[data-v-1feb0080] {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.break-word[data-v-1feb0080] {\n  word-wrap: break-word;\n  word-break: break-all;\n}\n.sr-only[data-v-1feb0080] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n}\ninput[data-v-1feb0080]:disabled {\n  opacity: 0.8;\n}\n.profile-module[data-v-1feb0080] {\n  width: 1000px;\n  margin: 20px auto;\n}\n.profile-module .title-h1[data-v-1feb0080] {\n    color: #ffffff;\n    margin-bottom: 20px;\n}\n.profile-module .title-h1 span[data-v-1feb0080] {\n      font-size: 24px;\n}\n.profile-module .title-h1 span[data-v-1feb0080]:first-of-type {\n        font-weight: bold;\n        padding-right: 3px;\n}\n.profile-module .title-h1 span[data-v-1feb0080]:last-of-type {\n        font-weight: bold;\n}\n.user-profile[data-v-1feb0080] {\n  background-color: #0b0e31;\n  padding-bottom: 50px;\n}\n.user-profile .title[data-v-1feb0080] {\n    padding: 15px 40px;\n    text-align: left;\n    color: #fcd667;\n    font-size: 14px;\n    font-weight: bold;\n    background-color: rgba(255, 255, 255, 0.1);\n}\n.user-profile .padding[data-v-1feb0080] {\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n    border-bottom: none;\n}\n.user-profile .profile .row[data-v-1feb0080] {\n    padding: 15px 10px;\n    margin: 0px 40px;\n    text-align: left;\n    border-bottom: 1px solid #122151;\n}\n.user-profile .profile .row input[data-v-1feb0080] {\n      border: none;\n      outline: none;\n      width: 420px;\n      color: #ffffff;\n      background-color: #0b0e31;\n      font-weight: bold;\n      margin-top: 10px;\n}\n.user-profile .profile .row .radio[data-v-1feb0080] {\n      margin: 0px 10px;\n      margin-top: 5px;\n}\n.user-profile .profile .row .done[data-v-1feb0080] {\n      width: 120px;\n      height: 36px;\n      line-height: 36px;\n      border-radius: 25px;\n      background-color: #4A90E2;\n      color: #ffffff;\n      text-align: center;\n      font-size: 12px;\n      margin-right: 10px;\n}\n.user-profile .profile .row .img[data-v-1feb0080] {\n      width: 50px;\n      height: 50px;\n}\n.user-profile .profile .row .img img[data-v-1feb0080] {\n        border-radius: 50%;\n}\n.user-profile .profile .row span[data-v-1feb0080],\n    .user-profile .profile .row input[data-v-1feb0080] {\n      vertical-align: middle;\n}\n.user-profile .profile .row .name[data-v-1feb0080] {\n      width: 20%;\n      color: #ffffff;\n      font-weight: bold;\n}\n.user-profile .profile .row .info[data-v-1feb0080] {\n      width: 78%;\n}\n.user-profile .profile .row .info .button[data-v-1feb0080],\n      .user-profile .profile .row .info .verified[data-v-1feb0080],\n      .user-profile .profile .row .info .edit[data-v-1feb0080] {\n        width: 120px;\n        height: 36px;\n        line-height: 36px;\n        text-align: center;\n        border-radius: 25px;\n}\n.user-profile .profile .row .info .button[data-v-1feb0080] {\n        background-color: #fcd667;\n        color: #0b0e31;\n}\n.user-profile .profile .row .info .verified[data-v-1feb0080] {\n        border: 2px solid #fcd667;\n        color: #fcd667;\n        position: relative;\n        line-height: 36px;\n}\n.user-profile .profile .row .info .verified i[data-v-1feb0080] {\n          color: #fcd667;\n          position: absolute;\n          right: 10px;\n          top: 10px;\n}\n.user-profile .profile .row .info .edit[data-v-1feb0080] {\n        border: 2px solid #ffffff;\n        color: #ffffff;\n        font-weight: bold;\n        outline: none;\n        background-color: #0b0e31;\n}\n.user-profile .profile .row .info .edit i[data-v-1feb0080] {\n          font-size: 12px;\n          font-style: normal;\n          font-weight: normal;\n          color: #9B9B9B;\n}\n",""])},548:function(e,t,n){t=e.exports=n(2)(!1),t.push([e.i,"\n.overflow[data-v-20827418] {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.break-word[data-v-20827418] {\n  word-wrap: break-word;\n  word-break: break-all;\n}\n.sr-only[data-v-20827418] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n}\n.editBg[data-v-20827418] {\n  background-color: rgba(0, 0, 0, 0.5);\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n.editBg .editBox[data-v-20827418] {\n    position: fixed;\n    width: 500px;\n    top: 180px;\n    left: 35%;\n    background-color: #0b0e31;\n    border-radius: 6px;\n    padding-bottom: 25px;\n}\n.editBg .editBox .title[data-v-20827418] {\n      width: 100%;\n      height: 50px;\n      line-height: 50px;\n      color: #ffffff;\n      font-size: 14px;\n      padding: 0px 20px;\n      font-weight: bold;\n      background-color: #122151;\n      border-top-right-radius: 6px;\n      border-top-left-radius: 6px;\n}\n.editBg .editBox .title .fr[data-v-20827418] {\n        color: #ffffff;\n        font-weight: bold;\n        font-size: 24px;\n        -webkit-transform: rotate(45deg);\n                transform: rotate(45deg);\n}\n.editBg .editBox .box[data-v-20827418] {\n      padding: 30px 20px;\n      padding-bottom: 0px;\n      margin: 0px auto;\n}\n.editBg .editBox .box textarea[data-v-20827418] {\n        width: 460px;\n        height: 150px;\n        background-color: #ffffff;\n        border-radius: 4px;\n        display: block;\n        margin: 0 auto;\n        margin-bottom: 15px;\n        border: none;\n        padding: 15px;\n}\n.editBg .editBox .gender[data-v-20827418] {\n      width: 300px;\n      height: 45px;\n      line-height: 45px;\n      border: 1px solid #0e2454;\n      background-color: #122151;\n      margin: 0px auto;\n      margin-bottom: 20px;\n      padding: 0px 15px;\n      border-radius: 25px;\n      color: #ffffff;\n      font-weight: bold;\n}\n.editBg .editBox .gender span[data-v-20827418] {\n        font-size: 14px;\n}\n.editBg .editBox .gender .fa[data-v-20827418] {\n        font-weight: bold;\n        padding-right: 10px;\n}\n.editBg .editBox .gender .check[data-v-20827418] {\n        color: #fcd667;\n        padding-top: 15px;\n}\n.editBg .editBox .button[data-v-20827418] {\n      width: 200px;\n      display: block;\n      height: 40px;\n      line-height: 40px;\n      background-color: #fcd667;\n      text-align: center;\n      color: #0b0e31;\n      outline: none;\n      border: none;\n      margin: 0px auto;\n      border-radius: 20px;\n}\n.editBg .editBox button[data-v-20827418]:disabled {\n      opacity: .5;\n}\n.editBg .editBox .input[data-v-20827418] {\n      width: 450px;\n      height: 45px;\n      line-height: 45px;\n      border-radius: 4px;\n      background-color: #122151;\n      color: #ffffff;\n      display: block;\n      border: none;\n      margin: 0 auto;\n      padding: 0px 20px;\n      margin-bottom: 15px;\n}\n.editBg .editBox .input[data-v-20827418]::-webkit-input-placeholder {\n        color: #ffffff;\n}\n.editBg .editBox .input[data-v-20827418]:-ms-input-placeholder {\n        color: #ffffff;\n}\n.editBg .editBox .input[data-v-20827418]::-ms-input-placeholder {\n        color: #ffffff;\n}\n.editBg .editBox .input[data-v-20827418]::placeholder {\n        color: #ffffff;\n}\n",""])},570:function(e,t,n){t=e.exports=n(2)(!1),t.push([e.i,"\n.overflow[data-v-4c48dee8] {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.break-word[data-v-4c48dee8] {\n  word-wrap: break-word;\n  word-break: break-all;\n}\n.sr-only[data-v-4c48dee8] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n}\n.mask-layer[data-v-4c48dee8] {\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  right: 0px;\n  bottom: 0px;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 2001;\n}\n.upload-file[data-v-4c48dee8] {\n  position: absolute;\n  width: 500px;\n  top: 180px;\n  left: 35%;\n  background-color: #0b0e31;\n  border-radius: 5px;\n  padding-bottom: 25px;\n}\n.upload-file .title[data-v-4c48dee8] {\n    width: 100%;\n    height: 50px;\n    line-height: 50px;\n    color: #ffffff;\n    font-size: 14px;\n    padding: 0px 20px;\n    font-weight: bold;\n    background-color: #122151;\n    border-top-right-radius: 5px;\n    border-top-left-radius: 5px;\n}\n.upload-file .title .fr[data-v-4c48dee8] {\n      color: #ffffff;\n      font-weight: bold;\n      font-size: 24px;\n      -webkit-transform: rotate(45deg);\n              transform: rotate(45deg);\n}\n.content .img[data-v-4c48dee8] {\n  width: 122px;\n  height: 122px;\n  margin: 30px auto;\n}\n.content .img img[data-v-4c48dee8] {\n    border-radius: 50%;\n}\n.content .disabled[data-v-4c48dee8] {\n  opacity: 0.5;\n}\n.content .input[data-v-4c48dee8] {\n  margin: 10px auto;\n  width: 200px;\n  text-align: center;\n  font-size: 14px;\n  color: #0b0e31;\n  background-color: #F7C202;\n  border-radius: 25px;\n  height: 40px;\n  line-height: 40px;\n  position: relative;\n}\n.content .input input[data-v-4c48dee8] {\n    opacity: 0;\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    right: 0px;\n    bottom: 0px;\n    width: 200px;\n    height: 40px;\n}\n",""])},588:function(e,t,n){t=e.exports=n(2)(!1),t.push([e.i,"\n.overflow[data-v-68bcd8d0] {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.break-word[data-v-68bcd8d0] {\n  word-wrap: break-word;\n  word-break: break-all;\n}\n.sr-only[data-v-68bcd8d0] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n}\n.mask-layer[data-v-68bcd8d0] {\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  right: 0px;\n  bottom: 0px;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 2001;\n}\n.dialog[data-v-68bcd8d0] {\n  position: absolute;\n  top: 20%;\n  left: 30%;\n  width: 600px;\n  background-color: #F0F0F0;\n  border-radius: 5px;\n}\n.dialog .title[data-v-68bcd8d0] {\n    width: 100%;\n    height: 50px;\n    line-height: 50px;\n    color: #4A4A4A;\n    font-size: 14px;\n    padding: 0px 10px;\n    font-weight: bold;\n    background-color: #ffffff;\n    border-top-right-radius: 6px;\n    border-top-left-radius: 6px;\n}\n.dialog .title .fr[data-v-68bcd8d0] {\n      color: #9B9B9B;\n      font-weight: bold;\n      font-size: 24px;\n      -webkit-transform: rotate(45deg);\n              transform: rotate(45deg);\n}\n.content[data-v-68bcd8d0] {\n  padding: 20px;\n  width: 80%;\n  margin: 10px auto;\n}\n.content .submit[data-v-68bcd8d0] {\n    width: 180px;\n    padding: 12px 0px;\n    text-align: center;\n    background-color: #D9534F;\n    color: #ffffff;\n    border-radius: 5px;\n    margin: 0px auto;\n    margin-top: 30px;\n    border: none;\n    display: block;\n}\n.content button[data-v-68bcd8d0]:disabled {\n    background-color: #D7D7D7;\n    opacity: 1;\n}\n.content .txt[data-v-68bcd8d0] {\n    color: #4A4A4A;\n    font-size: 14px;\n    margin-bottom: 10px;\n    padding: 0px 10px;\n}\n.content .info[data-v-68bcd8d0] {\n    color: #999999;\n    padding-top: 5px;\n    padding-left: 5px;\n}\n.content .code input[data-v-68bcd8d0] {\n    width: 300px;\n    height: 40px;\n    line-height: 40px;\n    border: 1px solid #F6F7FB;\n    border-radius: 3px;\n    padding: 0px 10px;\n}\n.content .code .plain-gray[data-v-68bcd8d0] {\n    background-color: #9B9B9B;\n}\n.content .code .plain-blue[data-v-68bcd8d0] {\n    background-color: #4A90E2;\n}\n.content .code .button[data-v-68bcd8d0] {\n    padding: 10px 25px;\n    color: #ffffff;\n    border-radius: 5px;\n    margin-left: 10px;\n    border: none;\n}\n",""])},737:function(e,t,n){"use strict";function i(e){r||n(850)}var a=n(475),o=n(771),s=n(4),r=!1,l=i,d=n.i(s.a)(a.a,o.a,o.b,!1,l,"data-v-20827418",null);d.options.__file="src/components/Setting/ProfileEdit.vue",t.a=d.exports},742:function(e,t,n){"use strict";function i(e){r||n(872)}var a=n(480),o=n(794),s=n(4),r=!1,l=i,d=n.i(s.a)(a.a,o.a,o.b,!1,l,"data-v-4c48dee8",null);d.options.__file="src/components/Setting/UploadFile.vue",t.a=d.exports},744:function(e,t,n){"use strict";function i(e){r||n(890)}var a=n(482),o=n(813),s=n(4),r=!1,l=i,d=n.i(s.a)(a.a,o.a,o.b,!1,l,"data-v-68bcd8d0",null);d.options.__file="src/components/Setting/VerifyDialog.vue",t.a=d.exports},770:function(e,t,n){"use strict";n.d(t,"a",function(){return i}),n.d(t,"b",function(){return a});var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"profile-module"},[e._m(0),e._v(" "),n("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"user-profile",attrs:{id:"profile-editor"}},[n("p",{staticClass:"title padding"},[e._v("个人资料")]),e._v(" "),n("div",{staticClass:"profile"},[n("p",{staticClass:"row"},[n("span",{staticClass:"name dl"},[e._v("用户名")]),e._v(" "),n("span",{staticClass:"info dl"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.profile.username,expression:"profile.username"}],staticClass:"dl",attrs:{disabled:"disabled"},domProps:{value:e.profile.username},on:{input:function(t){t.target.composing||e.$set(e.profile,"username",t.target.value)}}})])]),e._v(" "),n("p",{staticClass:"row"},[n("span",{staticClass:"name dl"},[e._v("我的头像")]),e._v(" "),n("span",{staticClass:"info dl"},[n("span",{staticClass:"img dl"},[n("img",{attrs:{src:e.profile.photo,width:"100%",height:"100%"}})]),e._v(" "),n("span",{staticClass:"edit hand dl fr",on:{click:function(t){e.uploadFile()}}},[e._v("变更")])])]),e._v(" "),n("p",{staticClass:"row"},[n("span",{staticClass:"name dl"},[e._v("出生年月日")]),e._v(" "),n("span",{staticClass:"info dl"},[n("el-date-picker",{ref:"input4",attrs:{disabled:e.birthdayFlag,type:"date",placeholder:"出生日期(仅能变更一次)","picker-options":e.pickerOptions0},model:{value:e.profile.birthday,callback:function(t){e.$set(e.profile,"birthday",t)},expression:"profile.birthday"}}),e._v(" "),n("button",{staticClass:"hand edit dl fr",attrs:{disabled:e.birthdayFlag},on:{click:function(t){e.editInfo(4)}}},[e._v("变更\n            "),n("i",[e._v("（仅一次）")])]),e._v(" "),n("span",{ref:"done4",staticClass:"done hand fr",staticStyle:{display:"none"},on:{click:function(t){e.updateProfile(4)}}},[e._v("点击完成")])],1)]),e._v(" "),n("p",{staticClass:"row"},[n("span",{staticClass:"name dl"},[e._v("真实姓名")]),e._v(" "),n("span",{staticClass:"info dl"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.profile.realname,expression:"profile.realname"}],staticClass:"dl",attrs:{disabled:"disabled",placeholder:"此项编辑完成后不能更改"},domProps:{value:e.profile.realname},on:{input:function(t){t.target.composing||e.$set(e.profile,"realname",t.target.value)}}}),e._v(" "),n("button",{staticClass:"hand edit dl fr",attrs:{disabled:e.realnameFlag},on:{click:function(t){e.editProfile(1)}}},[e._v("变更\n            "),n("i",[e._v("（仅一次）")])])])]),e._v(" "),n("p",{staticClass:"row"},[n("span",{staticClass:"name dl"},[e._v("性别")]),e._v(" "),n("span",{staticClass:"info dl"},[n("input",{staticClass:"dl",attrs:{disabled:"disabled"},domProps:{value:e.profile.gender?"女":"男"}}),e._v(" "),n("span",{staticClass:"hand edit dl fr",on:{click:function(t){e.editProfile(2)}}},[e._v("变更")])])]),e._v(" "),n("p",{staticClass:"row"},[n("span",{staticClass:"name dl"},[e._v("个性签名")]),e._v(" "),n("span",{staticClass:"info dl"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.profile.desc,expression:"profile.desc"}],staticClass:"dl",attrs:{disabled:"disabled"},domProps:{value:e.profile.desc},on:{input:function(t){t.target.composing||e.$set(e.profile,"desc",t.target.value)}}}),e._v(" "),n("span",{staticClass:"hand edit dl fr",on:{click:function(t){e.editProfile(3)}}},[e._v("变更")])])]),e._v(" "),n("p",{staticClass:"title"},[e._v("联系方式")]),e._v(" "),n("p",{staticClass:"row"},[n("span",{staticClass:"name dl"},[e._v("电子邮箱")]),e._v(" "),n("span",{staticClass:"info dl"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.profile.email,expression:"profile.email"}],ref:"input5",staticClass:"dl",attrs:{disabled:"disabled"},domProps:{value:e.profile.email},on:{input:function(t){t.target.composing||e.$set(e.profile,"email",t.target.value)}}}),e._v(" "),e.profile.email&&e.profile.email_confirmed_at?n("span",{staticClass:"verified fr dl"},[e._v("已验证\n            "),n("i",{staticClass:"fa"},[e._v(e._s(e.check))])]):e._e(),e._v(" "),e.profile.email&&!e.profile.email_confirmed_at?n("span",{staticClass:"button fr hand dl",on:{click:function(t){e.verifyInfo(5)}}},[e._v("立即验证")]):e._e()])]),e._v(" "),n("p",{staticClass:"row"},[n("span",{staticClass:"name dl"},[e._v("手机号码")]),e._v(" "),n("span",{staticClass:"info dl"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.profile.mobile,expression:"profile.mobile"}],ref:"input6",staticClass:"dl",attrs:{disabled:"disabled"},domProps:{value:e.profile.mobile},on:{input:function(t){t.target.composing||e.$set(e.profile,"mobile",t.target.value)}}}),e._v(" "),e.profile.mobile&&e.profile.mobile_confirmed_at?n("span",{staticClass:"verified fr dl"},[e._v("已验证\n            "),n("i",{staticClass:"fa"},[e._v(e._s(e.check))])]):e.profile.mobile_confirmed_at?e._e():n("span",{staticClass:"hand edit dl fr",on:{click:function(t){e.editProfile(6)}}},[e._v("变更")]),e._v(" "),e.profile.mobile&&!e.profile.mobile_confirmed_at?n("span",{ref:"done6",staticClass:"button fr hand dl",on:{click:function(t){e.verifyInfo(6)}}},[e._v("立即验证")]):e._e()])]),e._v(" "),n("p",{staticClass:"title"},[e._v("账户安全")]),e._v(" "),n("p",{staticClass:"row"},[n("span",{staticClass:"name dl"},[e._v("登录密码")]),e._v(" "),n("span",{staticClass:"info dl"},[n("input",{ref:"input5",staticClass:"dl",attrs:{placeholder:"******",disabled:"disabled"}}),e._v(" "),n("span",{staticClass:"hand edit dl fr",on:{click:function(t){e.editProfile(7)}}},[e._v("变更")])])])]),e._v(" "),e.upload.flag?n("upload-file",{attrs:{upload:e.upload,refresh:e.refresh}}):e._e(),e._v(" "),e.verify.flag?n("verify-dialog",{attrs:{verify:e.verify,profile:e.profile,fetchProfile:e.fetchProfile}}):e._e(),e._v(" "),e.profile.editFlag?n("profile-edit",{attrs:{profile:e.profile,updateProfile:e.updateProfile}}):e._e()],1)])},a=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",{staticClass:"title-h1"},[n("span",[e._v("编辑个人资料")])])}];i._withStripped=!0},771:function(e,t,n){"use strict";n.d(t,"a",function(){return i}),n.d(t,"b",function(){return a});var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"editBg"},[n("div",{staticClass:"editBox"},[n("p",{staticClass:"title"},[2===e.profile.editStyle?n("span",[e._v("编辑我的性别")]):3===e.profile.editStyle?n("span",[e._v("编辑个性签名")]):1===e.profile.editStyle?n("span",[e._v("编辑我的真实姓名")]):7===e.profile.editStyle?n("span",[e._v("变更登录密码")]):5===e.profile.editStyle?n("span",[e._v("编辑电子邮箱")]):6===e.profile.editStyle?n("span",[e._v("编辑手机号码")]):e._e(),e._v(" "),n("span",{staticClass:"hand fr",on:{click:function(t){e.close()}}},[e._v("+")])]),e._v(" "),n("div",{staticClass:"box"},[2===e.profile.editStyle?n("div",[n("p",{staticClass:"gender hand",on:{click:function(t){e.changeGender(0)}}},[n("span",{staticClass:"fa"},[e._v(e._s(e.mars))]),n("span",[e._v("男性")]),0===e.current?n("span",{staticClass:"fa check fr"},[e._v(e._s(e.check))]):e._e()]),e._v(" "),n("p",{staticClass:"gender hand",on:{click:function(t){e.changeGender(1)}}},[n("span",{staticClass:"fa"},[e._v(e._s(e.venus))]),n("span",[e._v("女性")]),1===e.current?n("span",{staticClass:"fa check fr"},[e._v(e._s(e.check))]):e._e()])]):3===e.profile.editStyle?n("div",[n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.sign,expression:"sign"}],attrs:{placeholder:"不能超过50个字符"},domProps:{value:e.sign},on:{input:function(t){t.target.composing||(e.sign=t.target.value)}}})]):1===e.profile.editStyle?n("div",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],staticClass:"input",attrs:{placeholder:"此项编辑确定后不能更改"},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}})]):5===e.profile.editStyle?n("div",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"input",attrs:{placeholder:"请输入新的邮箱地址"},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}})]):6===e.profile.editStyle?n("div",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.mobile,expression:"mobile"}],staticClass:"input",attrs:{placeholder:"请输入新的手机号码"},domProps:{value:e.mobile},on:{input:function(t){t.target.composing||(e.mobile=t.target.value)}}})]):7===e.profile.editStyle?n("div",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.oldPassword,expression:"oldPassword"}],staticClass:"input",attrs:{placeholder:"旧的登录密码(字数在6~12之间)"},domProps:{value:e.oldPassword},on:{input:function(t){t.target.composing||(e.oldPassword=t.target.value)}}}),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.newPasswod,expression:"newPasswod"}],staticClass:"input",attrs:{placeholder:"新的登录密码(字数在6~12之间)"},domProps:{value:e.newPasswod},on:{input:function(t){t.target.composing||(e.newPasswod=t.target.value)}}}),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.rePassword,expression:"rePassword"}],staticClass:"input",attrs:{placeholder:"确认登录密码(字数在6~12之间)"},domProps:{value:e.rePassword},on:{input:function(t){t.target.composing||(e.rePassword=t.target.value)}}})]):e._e()]),e._v(" "),2===e.profile.editStyle?n("button",{staticClass:"button hand",attrs:{disabled:""===e.current},on:{click:function(t){e.ok()}}},[e._v("确定")]):3===e.profile.editStyle?n("button",{staticClass:"button hand",attrs:{disabled:!e.sign},on:{click:function(t){e.ok()}}},[e._v("确定")]):1===e.profile.editStyle?n("button",{staticClass:"button hand",attrs:{disabled:!e.name},on:{click:function(t){e.ok()}}},[e._v("确定")]):5===e.profile.editStyle?n("button",{staticClass:"button hand",attrs:{disabled:!e.email},on:{click:function(t){e.ok()}}},[e._v("确定")]):6===e.profile.editStyle?n("button",{staticClass:"button hand",attrs:{disabled:!e.mobile},on:{click:function(t){e.ok()}}},[e._v("确定")]):7===e.profile.editStyle?n("button",{staticClass:"button hand",attrs:{disabled:!e.oldPassword||!e.newPasswod||!e.rePassword||e.passwordFlg},on:{click:function(t){e.change()}}},[e._v("确定")]):e._e()])])},a=[];i._withStripped=!0},794:function(e,t,n){"use strict";n.d(t,"a",function(){return i}),n.d(t,"b",function(){return a});var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mask-layer"},[n("div",{staticClass:"upload-file"},[n("p",{staticClass:"title"},[e._v("上传头像"),n("span",{staticClass:"hand fr",on:{click:function(t){e.close()}}},[e._v("+")])]),e._v(" "),n("div",{staticClass:"content"},[n("p",{staticClass:"img"},[e.image?n("img",{attrs:{src:e.image,width:"100%",height:"100%"}}):e._e()]),e._v(" "),n("p",{staticClass:"input hand",class:{disabled:e.disabled}},[e._v("\n         本地上传\n         "),n("input",{staticClass:"hand",attrs:{disabled:e.disabled,value:"本地上传",type:"file",accept:"image/*"},on:{change:function(t){e.fileSelected(t)}}})])])])])},a=[];i._withStripped=!0},813:function(e,t,n){"use strict";n.d(t,"a",function(){return i}),n.d(t,"b",function(){return a});var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mask-layer"},[e.verify.number&&5===e.verify.number?n("div",{staticClass:"dialog"},[n("p",{staticClass:"title"},[e._v("邮箱验证"),n("span",{staticClass:"hand fr",on:{click:function(t){e.close()}}},[e._v("+")])]),e._v(" "),n("div",{staticClass:"content"},[n("p",{staticClass:"txt"},[e._v(e._s(e.profile.email))]),e._v(" "),n("div",{staticClass:"code"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.code,expression:"code"}],staticClass:"dl",attrs:{type:"text",placeholder:"请输入验证码"},domProps:{value:e.code},on:{input:function(t){t.target.composing||(e.code=t.target.value)}}}),e._v(" "),e.disabled?n("span",{staticClass:"button plain-gray dl"},[e._v("请查看邮箱")]):n("button",{staticClass:"button hand plain-blue dl",attrs:{disabled:e.disabled},on:{click:function(t){e.getEmailCode()}}},[e._v("获取验证码")])]),e._v(" "),n("p",{staticClass:"info"},[e._v("点击左侧按钮获取电子邮箱验证码")]),e._v(" "),n("button",{staticClass:"hand submit",attrs:{disabled:!e.code&&e.submitDisabled},on:{click:function(t){e.email()}}},[e._v("进行验证")])])]):n("div",{staticClass:"dialog"},[n("p",{staticClass:"title"},[e._v("手机号验证"),n("span",{staticClass:"hand fr",on:{click:function(t){e.close()}}},[e._v("+")])]),e._v(" "),n("div",{staticClass:"content"},[n("p",{staticClass:"txt"},[e._v(e._s(e.profile.mobile))]),e._v(" "),n("div",{staticClass:"code"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.code,expression:"code"}],staticClass:"dl",attrs:{type:"text",placeholder:"请输入验证码"},domProps:{value:e.code},on:{input:function(t){t.target.composing||(e.code=t.target.value)}}}),e._v(" "),e.disabled?n("span",{staticClass:"button plain-gray dl"},[e._v(e._s(e.count)+"秒")]):n("button",{staticClass:"button hand plain-blue dl",attrs:{disabled:e.disabled},on:{click:function(t){e.getMobileCode()}}},[e._v("获取验证码")])]),e._v(" "),n("p",{staticClass:"info"},[e._v("点击左侧按钮获取手机号验证码")]),e._v(" "),n("button",{staticClass:"hand submit",attrs:{disabled:!e.code&&e.submitDisabled},on:{click:function(t){e.mobile()}}},[e._v("进行验证")])])])])},a=[];i._withStripped=!0},849:function(e,t,n){var i=n(547);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var a=n(3).default;a("115634dd",i,!1,{})},850:function(e,t,n){var i=n(548);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var a=n(3).default;a("7fbe08c2",i,!1,{})},872:function(e,t,n){var i=n(570);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var a=n(3).default;a("ebcc2e6c",i,!1,{})},890:function(e,t,n){var i=n(588);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var a=n(3).default;a("798a484e",i,!1,{})}});
//# sourceMappingURL=12.764f591e250eb549cfc8.js.map