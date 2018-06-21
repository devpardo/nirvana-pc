<template>
<section>
  <div v-if="showHint" id="" class="overlay main-modal open">
    <div class="popup">
      <div class="content">
          <div class="modal-header">
              <a type="button" class="close close-modal" data-dismiss="modal" aria-hidden="true" @click="$emit('update:showHint',false) "> x</a>
              <h4 class="modal-title" id="myModalLabel"><i class="fa fa-check-circle"></i> 您的订单已成功提交！</h4>
          </div>
          <div class="modal-body">
              <div class="col-xs-12">
                  <div class="deposit-modal">
                    <tabs>
                        <tab name="支付宝转账银行卡" id="alipay">
                            <ol class="how-to-list">
                              <li>

                                <p>1. 打开支付宝APP, 进入手机支付宝首页。</p>
                                <img src="../../assets/images/alipay-1.png">
                              </li>
                              <li>

                                <p>2. 在屏幕的左上方位置找到【转账】，如图所示，并点击它。</p>
                                <img src="../../assets/images/alipay-2.png">
                              </li>
                              <li>

                                <p>3. 选择转账对象：直接【转到银行卡】，或者【最近列表】选择转账对象</p>
                                <img src="../../assets/images/alipay-3.png">
                              </li>
                              <li>

                                <p>4. 在转账到银行卡的界面上：填写好要转账给对方人的姓名、卡号、存款金额</p>
                                <img src="../../assets/images/alipay-4.png">
                              </li>
                              <li>

                                <p>5.【确认转账】：如果需要填写备注，那么就在备注栏目填写相关信息，然后点击【确认转账】。</p>
                                <img src="../../assets/images/alipay-5.png">
                              </li>
                              <li>

                                <p>完成转账</p>
                                 <img src="../../assets/images/alipay-6.png">
                              </li>
                            </ol>
                        </tab>
                        <tab name="微信转账银行卡" id="wepay">
                            <ol class="how-to-list">
                              <li>
                                <p>1. 登录微信 -点击右上角的+号- 选择【收付款】</p>
                                <img src="../../assets/images/wechat-1.png">
                              </li>
                              <li>
                                <p>2. 在收付款界面里，下拉到底部，选择【转账到银行卡】</p>
                                <img src="../../assets/images/wechat-2.png">
                              </li>
                              <li>

                                <p>3. 在转账到银行卡的界面上：填写好要转账给对方人的姓名、卡号、收款银行</p>
                                <img src="../../assets/images/wechat-3.png">
                              </li>
                              <li>

                                <p>4. 在转账金额栏里，输入要转账的金额。在转账金额的下面会显示转账金额的手续费</p>
                                <img src="../../assets/images/wechat-4.png">
                              </li>
                              <li>

                                <p>5.确认要转账的金额和手续费无误，点击转账就可以了。</p>
                                <img src="../../assets/images/wechat-5.png">
                              </li>
                            </ol>
                        </tab>
                    </tabs>
                </div>
              </div>
              <div class="clearfix"></div>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-default close-modal bold-large" data-dismiss="modal" id="close">已完成支付
              </button>
          </div>
      </div>
    </div>
  </div>
  <!-- <div v-if="aliPayModal" id="alipay-offline-modal" class="overlay main-modal open">
    <div class="popup">
      <div class="content">
          <div class="modal-header">
              <a type="button" class="close close-modal" data-dismiss="modal" aria-hidden="true" @click="$emit('update:aliPayModal',false) "> x</a>
              <h4 class="modal-title" id="myModalLabel"><i class="fa fa-check-circle"></i> 您的订单已成功提交！</h4>
          </div>
          <div class="modal-body">
              <div class="col-xs-12">
                <div class="top-note">
                  <h3>支付宝扫码成功率<span class="red-text">100%</span>  单笔<span class="red-text">10元</span> - <span class="red-text">1000元</span></h3>
                  <h4>（本页面只支持<span class="blue-text">支付宝扫码</span>入款）</h4>
                  <p><span class="red-text">注意：</span>每次付款请扫描最新入款二维码，保存的二维码请勿二次使用！</p>
                  <p><span class="red-text">特别提醒：</span>会员支付时，一定要备注页面提供的交易备注码，如无备注或备注错误，</p>
                  <p>系统将无法为您即时入款，请各位会员配合。感谢您对亿万先生的支持！</p>
              </div>
              </div>
              <div class="col-xs-5"><img xmlns="http://www.w3.org/1999/xhtml" id="alipay-qrimg" src="http://cdn.mr007.co/alipay-qr/alipay-code.png" class="qr-img">

                  <div class="dep-info">
                      <ul class="list-unstyled response">
                          <li>转账金额: <span><span xmlns="http://www.w3.org/1999/xhtml" id="alipay-dep-val">21</span></span></li>
                          <li>交易备注码: <span><span xmlns="http://www.w3.org/1999/xhtml" id="alipay-offcode">2153</span></span></li>
                      </ul>
                  </div>
              </div>

              <div class="col-xs-7">
                  <img src="http://media.mr007.co/images/web/uc/alipay-phone-img.png" class="alipay-phone-img phone-img">
              </div>


              <div class="col-xs-12">
                  <div class="notes">
                      <p class="note note-red"><i class="fa fa-info-circle"></i> 扫码后，请按照右图所示填写【转账金额】与【交易备注码】后转账，系统将会在30秒内完成支付。</p>
                      <p class="note"><i class="fa fa-info-circle blue-text"></i> 若30秒后尚未到账，请及时联系 <span class="blue-text">在线客服 。</span></p>
                  </div>
              </div>

              <div class="clearfix"></div>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-default close-modal bold-large" data-dismiss="modal" id="close">已完成支付
              </button>
          </div>
      </div>
    </div>
  </div> -->
  </section>
</template>

<script>
export default {
  props: {
    showHint: {
      type: Boolean
    }
  }
};
</script>

<style lang="sass" scoped>
.open
  visibility: visible!important
  opacity: 1!important

h1
  text-align: center
  font-family: Tahoma, Arial, sans-serif
  color: beige
  margin: 80px 0

.box
  width: 40%
  margin: 0 auto
  background: rgba(255, 255, 255, 0.2)
  padding: 35px
  border: 2px solid #fff
  border-radius: 20px/50px
  background-clip: padding-box
  text-align: center

.button
  color: hsl(0, 0%, 100%)
  background-color: hsl(197, 56%, 43%)
  border-color: hsl(197, 56%, 43%)
  &:hover
    color: hsl(0, 0%, 100%)
    background-color: hsl(197, 56%, 43%)
    border-color: hsl(197, 56%, 43%)

a.button
  position: relative
  display: inline-block
  padding: 6px 50px
  margin-bottom: 0
  font-size: 14px
  font-weight: normal
  line-height: 1.42857143
  text-align: center
  white-space: nowrap
  vertical-align: middle
  cursor: pointer
  -webkit-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none
  background-image: none
  border: 1px solid hsla(0, 0%, 0%, 0)
  border-radius: 4px
  text-decoration: none
.qr-img
  margin: 0 auto
  border: 1px solid #e3e3e3
  width: 190px
  height: 190px
.phone-img
  display: block
  margin: 0 auto
  height: 315px !important
.overlay
  z-index: 2001
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  background: rgba(0, 0, 0, 0.5)
  transition: opacity 500ms
  visibility: hidden
  opacity: 0



.popup
  -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5)
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5)
  margin: 70px auto
  background: #fff
  border-radius: 5px
  width: 45%
  position: relative
  transition: all 5s ease-in-out
  h2
    margin-top: 0
    color: #333
    font-family: Tahoma, Arial, sans-serif
  .close
    position: absolute
    right: 15px
    transition: all 200ms
    font-size: 20px
    font-weight: bold
    text-decoration: none
    color: #333
    &:hover
      color: #06D85F
  .content
    max-height: 30%
    overflow: auto

@media screen and (max-width: 700px)
  .box, .popup
    width: 70%

.form-control
  margin: 10px
  display: block
  width: 100%
  height: 34px
  padding: 6px 12px
  font-size: 14px
  line-height: 1.42857143
  color: hsl(0, 0%, 33%)
  background-color: hsl(0, 0%, 100%)
  background-image: none
  border: 1px solid hsl(0, 0%, 80%)
  border-radius: 4px
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075)
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075)
  -webkit-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s

.modal
  &.in .modal-dialog
    -webkit-transform: translate(0, 0)
    -ms-transform: translate(0, 0)
    -o-transform: translate(0, 0)
    transform: translate(0, 0)
  &.fade .modal-dialog
    -webkit-transition: -webkit-transform .3s ease-out
    -o-transition: -o-transform .3s ease-out
    transition: transform .3s ease-out
    -webkit-transform: translate(0, -25%)
    -ms-transform: translate(0, -25%)
    -o-transform: translate(0, -25%)
    transform: translate(0, -25%)

.vertical-align-center
  display: table-cell
  vertical-align: middle
  pointer-events: none

.modal-content
  width: inherit
  height: inherit
  margin: 0 auto
  pointer-events: all

.main-modal .modal-header
  padding: 12px

.modal-header
  border-bottom: none
  padding: 15px
  border-bottom: 1px solid hsl(0, 0%, 90%)

*
  margin: 0
  padding: 0

.modal-header .close
  margin-top: -2px

button.close
  -webkit-appearance: none
  padding: 0
  cursor: pointer
  background: hsla(0, 0%, 0%, 0)
  border: 0

.close
  float: right
  font-size: 21px
  font-weight: bold
  line-height: 1
  color: hsl(0, 0%, 0%)
  text-shadow: 0 1px 0 #fff
  filter: alpha(opacity = 20)
  opacity: .2

.main-modal .modal-header h4
  margin: 0
  font-size: 1em

.modal-title, .modal-footer, .modal-body
  text-align: center
  border-radius: 3px

.modal-title
  color: hsl(208, 56%, 46%)
  margin: 0
  line-height: 1.42857143

.main-modal .modal-body
  background-color: hsl(0, 0%, 92%)
  height: auto

.modal-body
  position: relative
  padding: 15px

.main-modal
  .top-note
    padding: 10px
    border: 1px solid hsl(353, 98%, 41%)
    margin-bottom: 10px
  .green-text
    color: hsl(119, 80%, 41%)
  .top-note p
    margin-bottom: 0
    font-size: 11px
  .alipay-qr
    margin: 0 auto
    border: 1px solid hsl(0, 0%, 89%)
    width: 190px !important
    height: 190px !important
  .alipay-phone-img
    display: block
    margin: 0 auto
    height: 315px !important
  .dep-info > .response
    background-color: hsl(0, 0%, 100%)
    margin-top: 5px
    padding: 5px

.list-unstyled
  padding-left: 0
  list-style: none

.main-modal
  .notes
    margin-top: 10px
  p
    &.note
      font-size: 11px
      text-align: left
      margin-bottom: 0
    &.note-red
      color: hsl(353, 98%, 41%)
  .blue-text
    color: hsl(212, 72%, 59%)
  .red-text
    color: hsl(353, 98%, 41%)
  .modal-footer
    background: hsl(0, 0%, 92%)
    border-bottom-left-radius: 5px
    border-bottom-right-radius: 5px
    padding: 10px 0
  .btn-default.close-modal
    background-color: hsl(213, 53%, 51%)
    cursor: pointer
    color: hsl(0, 0%, 100%)
    border-radius: 30px
    padding: 8px 30px
    min-width: 200px
    font-size: 12px
    margin: 10px 0

.modal-footer > button
  border: none

.btn
  min-width: 100px

.close.close-modal
  cursor: pointer

.close.close-modal:hover
  color: #777777

.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12
  float: left

.col-xs-5
  width: 41.66666667%

.col-xs-12
  width: 100%

.col-xs-7
  width: 58.33333333%
</style>
