<template lang="html">
  <div>
    <!-- 1 -->
    <div class="activity-detail" v-if="parseInt(ob.category) <= 1">
      <p class="title-img hand" @click="changeShow(0)">
        <img src="../../assets/images/pmbnr_01.jpg" width="100%" height="100%"/>
        <span class="dl" ref="down0"></span>
      </p>
      <div class="content" style="display: none" ref="content0">

        <div class="h5">
          <h1>亚太娱乐首存、再存、三存100%红利重磅来袭，最高可得2888元</h1>
          <h2>千种电子游戏邀您瓜分巨额奖池</h2>
        </div>

        <div class="h5">
          <p class="weight">活动内容：100%老虎机三重红利，轻松畅玩五大电子平台千款老虎机</p>
          <p class="weight">活动时间：长期有效</p>
        </div>

        <div class="txt">
          <p>优惠详情：</p>
            <table>
              <tr>
                <td colspan="3">首存100%优惠</td>
              </tr>
              <tr>
                <td>存款范围</td>
                <td>最高享受金额</td>
                <td>取款要求 </td>
              </tr>
              <tr>
                <td>最低30元起</td>
                <td>100元</td>
                <td>如领取并使用首存100%优惠券仅需15倍投注即可提款，例：存款100，申请100%的首存优惠，即（100元+100元）*15＝3000有效投注额</td>
              </tr>
            </table>

            <table>
              <tr>
                <td colspan="3">再存100%优惠</td>
              </tr>
              <tr>
                <td>存款范围</td>
                <td>最高享受金额</td>
                <td>取款要求 </td>
              </tr>
              <tr>
                <td>最低101元起</td>
                <td>500元</td>
                <td>如领取并使用再存100%优惠券仅需18倍投注即可提款，例：存款500，申请100%的再存优惠，即（500元+500元）*18＝18000有效投注额</td>
              </tr>
            </table>

            <table>
              <tr>
                <td colspan="3">三存100%优惠</td>
              </tr>
              <tr>
                <td>存款范围</td>
                <td>最高享受金额</td>
                <td>取款要求 </td>
              </tr>
              <tr>
                <td>最低501元起</td>
                <td>2888元</td>
                <td>如领取并使用三存100%优惠券仅需25倍投注即可提款，例：存款500，申请100%的三存优惠，即（500元+500元）*25＝25000有效投注额</td>
              </tr>
            </table>

          <p>活动规则：</p>
          <ol class="number-list">
            <li>登录后点击领取优惠券即可。</li>
            <li>此活动适用于亚太娱乐所有老虎机场馆使用。</li>
            <li>此优惠获取的投注奖金仅限亚太老虎机进行游戏，需独立使用、不与其它红利共享。</li>
            <li>此优惠不可用于以下游戏：古怪猴子、黄金之旅、船长的宝藏、招财进宝、高速公路之王、疯狂7、花花公子、冰上曲棍球。如有违规扣除盈利，返还本金。</li>
            <li>亚太娱乐秉承公平公正原则，如发现任何人或团体以不诚实的方式合伙套取红利或其他利益，将取消并回收该IP下所有会员帐号的优惠以及优惠产生的盈利。亚太娱乐有权冻结账号及资金，并不另行通知玩家。（同一帐户／家庭／户籍地址／电邮地址／电话号码／银行卡／ IP地址／共享计算机环境等，关联账号不得参与此活动）</li>
            <li>亚太娱乐保留在任何时候终止或修改本活动规则及内容，最终解释权归亚太娱乐所有。</li>
          </ol>
        </div>
        <p class="hide hand" @click="hide(0)">点击收起</p>
      </div>
    </div>

    <!-- 2 -->
    <div class="activity-detail" v-if="parseInt(ob.category) === 2 || parseInt(ob.category) === 0">
      <p class="title-img hand" @click="changeShow(1)">
        <img src="../../assets/images/pmbnr_02.jpg" width="100%" height="100%"/>
        <span class="dl" ref="down1"></span>
      </p>
      <div class="content" style="display: none" ref="content1">
        <div class="h5">
          <h1>开户红利，真人娱乐首存最高3888元真情回馈 </h1>
          <h2>亚太娱乐 玩的尽心 盈利无优</h2>
        </div>

        <div class="h5">
          <p class="weight">活动内容：真人百家乐首存让利30%，再存让利20%助您过关斩将，满载而归</p>
          <p>活动时间：长期有效</p>
          <p class="weight">活动规则：</p>
        </div>

        <div class="txt">
          <ol class="number-list">
            <li>此活动仅于亚太娱乐真人场馆百家乐娱乐厅使用。</li>
            <li>此活动领取方式为优惠券，最低首存100元，最高可获得3888元优惠</li>
            <li>此活动优惠券为首存30%和再存20%两种形式</li>
            <li>转账场馆时请选择优惠券并完成转账即可，您亦可在“我的优惠”中查看优惠券详情。</li>
            <li>
              <table>
                <tr>
                  <td colspan="3">首存30%优惠</td>
                </tr>
                <tr>
                  <td>存款范围</td>
                  <td>最高享受金额</td>
                  <td>取款要求</td>
                </tr>
                <tr>
                  <td>最低100元起</td>
                  <td>3888元</td>
                  <td>若领取并使用再存30%的优惠券,仅需完成[本金+奖金]的25倍投注即可提款。例：存款1000元，申请30%的优惠，那么您的提款要求则为：（1000元+300元）*25＝32500有效投注额。</td>
                </tr>
              </table>
            </li>
            <li>
              <table>
                <tr>
                  <td colspan="3">再存20%优惠</td>
                </tr>
                <tr>
                  <td>存款范围</td>
                  <td>最高享受金额</td>
                  <td>取款要求</td>
                </tr>
                <tr>
                  <td>最低100元起</td>
                  <td>1888元</td>
                  <td>若领取并使用再存20%的优惠券,仅需完成[本金+奖金]的18倍投注即可提款。例：存款1000元，申请20%的优惠，那么您的提款要求则为：（1000元+200元）*18＝21600元有效投注额。</td>
                </tr>
              </table>
            </li>
            <li>亚太娱乐秉承公平公正原则，如发现任何人或团体以不诚实的方式合伙套取红利或其他利益，将取消并回收该IP下所有会员帐号的优惠以及优惠产生的盈利。亚太娱乐有权冻结账号及资金，并不另行通知玩家。（同一帐户／家庭／户籍地址／电邮地址／电话号码／银行卡／ IP地址／共享计算机环境等，关联账号不得参与此活动）</li>
            <li>亚太娱乐保留在任何时候终止或修改本活动规则及内容，最终解释权归亚太娱乐所有。</li>
          </ol>
        </div>
        <p class="hide hand" @click="hide(1)">点击收起</p>
      </div>
    </div>

    <!-- 3 -->
    <div class="activity-detail" v-if="parseInt(ob.category) === 0 || parseInt(ob.category) <= 1">
      <p class="title-img hand" @click="changeShow(2)">
        <img src="../../assets/images/pmbnr_03.jpg" width="100%" height="100%"/>
        <span class="dl" ref="down2"></span>
      </p>
      <div class="content" style="display: none" ref="content2">
        <div class="h5">
          <h1>即存即送，2%无次数限制，您存款，“手续费”我来付</h1>
          <h2>活动内容：存款即送最低1%，新老会员皆可参与</h2>
        </div>
        <div class="h5">
          <p class="weight">活动时间：长期有效</p>
        </div>
        <div class="txt">
          <table>
            <tr>
              <td>存款方式</td>
              <td>存款金额</td>
              <td>现金回馈</td>
            </tr>
            <tr>
              <td>支付宝扫码</td>
              <td rowspan="2">每笔≥100</td>
              <td rowspan="2">会员可享受1%现金回馈，最高500元。</td>
            </tr>
            <tr>
              <td>微信扫码</td>
            </tr>

            <tr colspan="3">
              <td></td>
            </tr>

            <tr>
              <td>网银转账</td>
              <td rowspan="4">每笔≥100</td>
              <td rowspan="4">会员可享受2%现金回馈，最高500元。</td>
            </tr>
            <tr>
              <td>ATM转账</td>
            </tr>

            <tr>
              <td>柜台转账</td>
            </tr>
            <tr>
              <td>云闪付</td>
            </tr>

          </table>

          <p>活动规则:</p>
          <ol class="number-list">
            <li>若会员以线上支付进行充值,每天单笔≥100的存款即都可以享受存款金额1%的礼金回赠,单日(北京时间0:00-23:59分)最高500元；</li>
            <li>若会员以线下支付进行充值,每天单笔≥100的存款即都可以享受存款金额2%的礼金回赠,单日(北京时间0:00-23:59分)最高500元</li>
            <li>存款奖励会在充值成功的同时系统自动添加,无需申请,无需联系客服处理；</li>
            <li>存款+优惠仅需达到全额投注即可随时申请提款；</li>
            <li>本活动不可与本娱乐场的首存优惠共享（享受首存优惠当周），可与洗码优惠共享，活动期间内日日皆可享受，存款奖励会在充值成功的同时系统自动添加,无需申请,无需联系客服处理。</li>
            <li>亚太娱乐秉承公平公正原则，如发现任何人或团体以不诚实的方式合伙套取红利或其他利益，将取消并回收该IP下所有会员帐号的优惠以及优惠产生的盈利。亚太娱乐有权冻结账号及资金，并不另行通知玩家。（同一帐户／家庭／户籍地址／电邮地址／电话号码／银行卡／ IP地址／共享计算机环境等，关联账号不得参与此活动）</li>
            <li>亚太娱乐保留在任何时候终止或修改本活动规则及内容，最终解释权归亚太娱乐所有。</li>
          </ol>
        </div>
        <p class="hide hand" @click="hide(2)">点击收起</p>
      </div>
    </div>

    <!-- 4 -->
    <div class="activity-detail" v-if="parseInt(ob.category) === 0 || parseInt(ob.category) <= 1">
      <p class="title-img hand" @click="changeShow(3)">
        <img src="../../assets/images/pmbnr_07.jpg" width="100%" height="100%"/>
        <span class="dl" ref="down3"></span>
      </p>
      <div class="content" style="display: none" ref="content3">

        <!-- bryan -->

        <div class="h5">
          <h1>会员晋级洗码设定 </h1>
          <p> 日结洗码无限赠送，最高可达1.5% 无需投注，即返即提	 </p>
        </div>

        <div class="h5">
          <p class="weight">活动时间：长期有效</p>
          <p class="weight">活动对象：亚太娱乐新老会员</p>
          <p class="weight">活动内容：洗码优惠以日有效投注额为单位计算（北京时间 00:00-23:59），会员有效投注额达到相应的条件即可享受到相应比例的返水。</p>
          <p class="weight">星级升级：单周/月自然月中某一周或是当月有效投注额达到相应的条件，次周/次月即可升级为新的会员星级，可按照新的会员星级结算相应的洗码。</p>
          <p class="weight">派送时间：洗码礼金无上限（低于1元的礼金不予派送）多投多得，每日北京时间15:00后可随时申请结算，提款时间不限，返水亦可以选择继续投注游戏。</p>
        </div>

        <div id="tabsung">
            <tabs>
                <tab id="casino" name="真人娱乐洗码">
                    <div class="three-table">
                      <table>
                        <tr>
                          <td colspan="3">真人娱乐洗码</td>
                        </tr>
                        <tr>
                          <td>会员星级</td>
                          <td>升级条件</td>
                          <td>洗码比例</td>
                        </tr>
                        <tr>
                          <td> LV.1 </td>
                          <td> 成功充值后即为1星级会员 </td>
                          <td> 0.60% </td>
                        </tr>
                        <tr>
                          <td> LV.2 </td>
                          <td> 单周单一大厅有效投注额累计达到10万及以上或月有效投注额达到40万以上 </td>
                          <td> 0.70% </td>
                        </tr>
                        <tr>
                          <td> LV.3 </td>
                          <td> 单周单一大厅有效投注额累计达到50万及以上或月有效投注额达到100万以上 </td>
                          <td> 0.80% </td>
                        </tr>
                        <tr>
                          <td> LV.4 (VIP) </td>
                          <td> 单周单一大厅有效投注额累计达到100万及以上或月有效投注额达到400万以上 </td>
                          <td> 0.90% </td>
                        </tr>
                        <tr>
                          <td rowspan="2"> LV.5（高级VIP) </td>
                          <td> 单周单一大厅有效投注额累计达到300万及以上或月有效投注额达到1200万以上 </td>
                          <td rowspan="2"> 1.00% </td>
                        </tr>
                        <tr>
                          <td>或一次性存款50万人民币以上，2倍投注，期间没有申请取款</td>
                        </tr>
                        <tr>
                          <td> LV.6（至尊VIP) </td>
                          <td> 一次性存款200万人民币以上，8倍有效投注，期间没有申请取款 </td>
                          <td> 1.00% </td>
                        </tr>
                      </table>

                      <table>
                        <tr>
                          <td>
                            <h1> 真人娱乐洗码其他规则说明：</h1>
                          </td>
                        </tr>
                        <div>
                          <ol class="number-list table-margin">
                            <li>
                              有效投注额计算：即产生输赢结果的投注，因特殊原因退还本金等所有未产生输赢结果的投注不计算在内；有效投注额是指有输赢结果的投注额累积，所有退还本金的投注或者无风险、最小风险的投注不能作为有效投注，如同时下注百家乐游戏的庄、闲。
                            </li>
                            <li>
                              取款要求及上限：洗码返利可继续投注也可立即取款，多投多送，不设上限；
                            </li>
                            <li>
                              星级转让：各星级会员所涉及的所有福利不可转让；
                            </li>
                            <li>
                              洗码优惠与开户优惠或其他指定优惠，不能同时享受；
                            </li>
                            <li>
                              亚太娱乐秉承公平公正原则，如发现任何人或团体以不诚实的方式合伙套取红利或其他利益，将取消并回收该IP下所有会员帐号的优惠以及优惠产生的盈利。亚太娱乐有权冻结账号及资金，并不另行通知玩家。（同一帐户／家庭／户籍地址／电邮地址／电话号码／银行卡／ IP地址／共享计算机环境等，关联账号不得参与此活动）
                            </li>
                            <li>
                              为避免文字理解差异，本娱乐场保留对此活动的最终解释权
                            </li>
                          </ol>
                        </div>
                      </table>
                    </div>
                </tab>
                <tab id="slots" name="电子游艺洗码">
                    <div class="three-table">
                      <table>
                        <tr>
                          <td colspan="3">电子游艺洗码</td>
                        </tr>
                        <tr>
                          <td>会员星级</td>
                          <td>升级条件</td>
                          <td>洗码比例</td>
                        </tr>
                        <tr>
                          <td> LV.1 </td>
                          <td> 成功充值后即为1星级会员 </td>
                          <td> 0.80% </td>
                        </tr>
                        <tr>
                          <td> LV.2 </td>
                          <td> 单周单一大厅有效投注额累计达到10万及以上或月有效投注额达到40万以上 </td>
                          <td> 1.00% </td>
                        </tr>
                        <tr>
                          <td> LV.3 </td>
                          <td> 单周单一大厅有效投注额累计达到50万及以上或月有效投注额达到100万以上 </td>
                          <td> 1.20% </td>
                        </tr>
                        <tr>
                          <td> LV.4 (VIP) </td>
                          <td> 单周单一大厅有效投注额累计达到100万及以上或月有效投注额达到400万以上 </td>
                          <td> 1.40% </td>
                        </tr>
                        <tr>
                          <td rowspan="2"> V.5（高级VIP </td>
                          <td> 单周单一大厅有效投注额累计达到300万及以上或月有效投注额达到1200万以上 </td>
                          <td rowspan="2"> 1.50% </td>
                        </tr>
                        <tr>
                          <td>或一次性存款50万人民币以上，2倍投注，期间没有申请取款</td>
                        </tr>
                        <tr>
                          <td> LV.6（至尊VIP </td>
                          <td> 一次性存款200万人民币以上，8倍有效投注，期间没有申请取款 </td>
                          <td> 1.50% </td>
                        </tr>
                      </table>

                      <table>
                        <tr>
                          <td>
                            <h1> 电子游艺洗码其他规则说明：</h1>
                          </td>
                        </tr>
                        <div>
                          <ol class="number-list table-margin">
                            <li>
                              特惠电子游戏，不计算为有效投注额。
                            </li>
                            <li>
                              取款要求及上限：洗码返利可继续投注也可立即取款，多投多送，不设上限；
                            </li>
                            <li>
                              星级转让：各星级会员所涉及的所有福利不可转让；
                            </li>
                            <li>
                              洗码优惠与开户优惠或其他指定优惠，不能同时享受。
                            </li>
                            <li>
                              亚太娱乐秉承公平公正原则，如发现任何人或团体以不诚实的方式合伙套取红利或其他利益，将取消并回收该IP下所有会员帐号的优惠以及优惠产生的盈利。亚太娱乐有权冻结账号及资金，并不另行通知玩家。（同一帐户／家庭／户籍地址／电邮地址／电话号码／银行卡／ IP地址／共享计算机环境等，关联账号不得参与此活动） IP地址／共享计算机环境等，关联账号不得参与此活动）
                            </li>
                            <li>
                              为避免文字理解差异，本娱乐场保留对此活动的最终解释权
                            </li>
                          </ol>
                        </div>
                      </table>
                    </div>
                </tab>
                <tab id="sports" name="体育投注洗码">
                    <div class="three-table">
                      <table>
                        <tr>
                          <td colspan="3">体育投注洗码</td>
                        </tr>
                        <tr>
                          <td>会员星级</td>
                          <td>升级条件</td>
                          <td>洗码比例</td>
                        </tr>
                        <tr>
                          <td> LV.1 </td>
                          <td> 成功充值后即为1星级会员 </td>
                          <td> 0.40% </td>
                        </tr>
                        <tr>
                          <td> LV.2 </td>
                          <td> 单周单一大厅有效投注额累计达到10万及以上或月有效投注额达到40万以上 </td>
                          <td> 0.50% </td>
                        </tr>
                        <tr>
                          <td> LV.3 </td>
                          <td> 单周单一大厅有效投注额累计达到50万及以上或月有效投注额达到100万以上 </td>
                          <td> 0.60% </td>
                        </tr>
                        <tr>
                          <td> LV.4 (VIP) </td>
                          <td> 单周单一大厅有效投注额累计达到100万及以上或月有效投注额达到400万以上 </td>
                          <td> 0.70% </td>
                        </tr>
                        <tr>
                          <td rowspan="2"> V.5（高级VIP </td>
                          <td> 单周单一大厅有效投注额累计达到300万及以上或月有效投注额达到1200万以上 </td>
                          <td rowspan="2"> 0.80% </td>
                        </tr>
                        <tr>
                          <td>或一次性存款50万人民币以上，2倍投注，期间没有申请取款</td>
                        </tr>
                        <tr>
                          <td> LV.6（至尊VIP </td>
                          <td> 一次性存款200万人民币以上，8倍有效投注，期间没有申请取款 </td>
                          <td> 0.90% </td>
                        </tr>
                      </table>

                      <table>
                        <tr>
                          <td>
                            <h1> 体育投注洗码其他规则说明：</h1>
                          </td>
                        </tr>
                        <div>
                          <ol class="number-list table-margin">
                            <li>
                              有效投注额计算：即产生输赢结果的投注，因特殊原因退还本金等所有未产生输赢结果的投注不计算在内；
                            </li>
                            <li>
                              赔率低于欧洲盘1.5，香港盘0.5，马来盘0.5，印尼盘-2.00，美式盘-200的投注，不计入有效投注额；
                            </li>
                            <li>
                              混合过关投注里面，只要其中有一场比赛的赔率低于0.5，整个混合过关赛事将不计入有效投注额；
                            </li>
                            <li>
                              取款要求及上限：洗码返利可继续投注也可立即取款，多投多送，不设上限；
                            </li>
                            <li>
                              星级转让：各星级会员所涉及的所有福利不可转让； IP地址／共享计算机环境等，关联账号不得参与此活动） IP地址／共享计算机环境等，关联账号不得参与此活动）
                            </li>
                            <li>
                              洗码优惠与开户优惠或其他指定优惠，不能同时享受。
                            </li>
                            <li>
                              亚太娱乐秉承公平公正原则，如发现任何人或团体以不诚实的方式合伙套取红利或其他利益，将取消并回收该IP下所有会员帐号的优惠以及优惠产生的盈利。亚太娱乐有权冻结账号及资金，并不另行通知玩家。（同一帐户／家庭／户籍地址／电邮地址／电话号码／银行卡／ IP地址／共享计算机环境等，关联账号不得参与此活动）
                            </li>
                            <li>
                              为避免文字理解差异，本娱乐场保留对此活动的最终解释权
                            </li>
                          </ol>
                        </div>
                      </table>
                    </div>
                </tab>
            </tabs>
        </div>

        <p class="hide hand" @click="hide(3)">点击收起</p>
      </div>
    </div>

    <!-- 5 -->
    <div class="activity-detail" v-if="parseInt(ob.category) === 0 || parseInt(ob.category) === 4">
      <p class="title-img hand" @click="changeShow(4)">
        <img src="../../assets/images/pmbnr_04.jpg" width="100%" height="100%"/>
        <span class="dl" ref="down4"></span>
      </p>
      <div class="content" style="display: none" ref="content4">

        <div class="h5">
          <h1>存款及流水任务</h1>
        </div>
        <div class="h5">
          <p class="weight">累计存款 ，次次送 。 任务礼金高达888元</p>
          <p class="weight">活动细则：</p>
        </div>
        <div>
            <ol class="number-list">
              <li> 新老会员，每日（北京时间每日0:00-23:59:59）：登录亚太娱乐官网，任务即启动，累积存款当日达到500元第一次任务完成，即可领取18元现金，之后再开始第二次任务，再达到500又可以领取18元的任务奖金；任务奖金只需5倍流水即可提款，不限制投注场馆。</li>
              <li> 新老会员，当周（北京时间每周一0:00－周日23:59:59）：登录亚太娱乐官网，周任务即启动，周存款累积达到10000元，即可领取288元的任务礼金；任务奖金只需要10倍流水即可提款，不限制投放场馆. </li>
              <li> 新老会员，当月（北京时间每月1日0:00-31日23:59:59）：登录亚太娱乐官网，月任务即启动，月存款累积10万元即可领取888元现金；任务奖金仅需要15倍流水即可提款，不限制投放场馆。</li>
              <li class="weigth"> 所有真钱会员，任意一笔充值并投注，达到金额达提款金额，可随时自助申请结算洗码。洗码优惠和网站的其他优惠不能同时享受。</li>
            </ol>
        </div>

        <div class="txt">
           <table>
            <tr>
              <td rowspan="3">会员星级</td>
              <td colspan="4">当周目标流水</td>
            </tr>
            <tr>
              <td>5万</td>
              <td>10万</td>
              <td>20万</td>
              <td>40万</td>
            </tr>
            <tr>
              <td colspan="4">对应奖金/元</td>
            </tr>
            <tr>
              <td> LV.1 </td>
              <td> 20 </td>
              <td> 40 </td>
              <td> 80 </td>
              <td> 160 </td>
            </tr>
            <tr>
              <td> LV.2 </td>
              <td> 25 </td>
              <td> 50 </td>
              <td> 100 </td>
              <td> 200 </td>
            </tr>
            <tr>
              <td> LV.3</td>
              <td> 30 </td>
              <td> 60 </td>
              <td> 120 </td>
              <td> 240 </td>
            </tr>
            <tr>
              <td> LV.4 (VIP)</td>
              <td> 35 </td>
              <td> 70 </td>
              <td> 140 </td>
              <td> 280 </td>
            </tr>
            <tr>
              <td> LV.5（高级VIP）</td>
              <td> 40 </td>
              <td> 80 </td>
              <td> 160 </td>
              <td> 320 </td>
            </tr>
            <tr>
              <td> LV.6（至尊VIP）</td>
              <td> 45 </td>
              <td> 90 </td>
              <td> 180 </td>
              <td> 360 </td>
            </tr>
          </table>
        </div>
        <p class="hide hand" @click="hide(4)">点击收起</p>
      </div>
    </div>

    <!-- 8 -->
    <div class="activity-detail" v-if="parseInt(ob.category) === 0 || parseInt(ob.category) === 4">
      <p class="title-img hand" @click="changeShow(5)">
        <img src="../../assets/images/pmbnr_08.jpg" width="100%" height="100%"/>
        <span class="dl" ref="down5"></span>
      </p>
      <div class="content" style="display: none" ref="content5">
        <div class="h5">
          <h1>每天登陆亚太娱乐游戏 奖金、亚太币好礼拿不停</h1>
          <h2>亚太娱乐 玩的尽心 盈利无优</h2>
        </div>
        <div class="h5">
          <p class="weight">活动内容：亚太娱乐贴心好礼 福利多多</p>
          <p class="weight">活动时间：长期有效</p>
        </div>
        <div class="txt">
          <p>活动规则：</p>
          <ol class="number-list">
            <li>活动期间每日登陆亚太娱乐即可获得亚太娱乐1个签到亚太币。</li>
            <li>新用户注册见面礼，活动期间凡新注册的用在验证手机、邮箱之后即可拿免费获得亚太娱乐奖金亚太币。</li>
            <li>活动期间亚太娱乐所有真钱会员每次充值最低100元均可免费获得当次充值金额1%的亚太币。</li>
            <li>免费获得的亚太币均可在亚太娱乐[亚太商城]中兑换相对应的礼品或是用于大转盘抽奖。</li>
            <li>同邮箱、同手机号仅可享受一次，涉嫌欺诈行为的会员账户将被永久冻结。</li>
            <li>亚太娱乐秉承公平公正原则，如发现任何人或团体以不诚实的方式合伙套取红利或其他利益，将取消并回收该IP下所有会员帐号的优惠以及优惠产生的盈利。亚太娱乐有权冻结账号及资金，并不另行通知玩家。（同一帐户／家庭／户籍地址／电邮地址／电话号码／银行卡／ IP地址／共享计算机环境等，关联账号不得参与此活动）</li>
            <li>亚太娱乐保留在任何时候终止或修改本活动规则及内容，最终解释权归亚太娱乐所有。</li>
          </ol>
        </div>

        <p class="hide hand" @click="hide(5)">点击收起</p>
      </div>
    </div>

    <!-- 9 -->
    <div class="activity-detail" v-if="parseInt(ob.category) === 0 || parseInt(ob.category) === 4">
      <p class="title-img hand" @click="changeShow(6)">
        <img src="../../assets/images/pmbnr_09.jpg" width="100%" height="100%"/>
        <span class="dl" ref="down6"></span>
      </p>
      <div class="content" style="display: none" ref="content6">
        <div class="h5">
          <h1>手机与邮箱验证礼 做个有身份的会员，享受专属优惠！</h1>
        </div>

        <div class="h5">
          <p class="weight">验证手机邮箱 即免费领取亚太娱乐礼金&亚太币</p>
        </div>

        <div class="h5">
          <p class="weight">活动内容：关注亚太，验证信息，不错过每一次福利！</p>
          <p>活动时间：长期有效</p>
        </div>

        <div class="txt">
          <p>参与方式：</p>
          <table>
            <tr>
              <td>验证项目</td>
              <td>奖励</td>
              <td> 验证方法 </td>
            </tr>
            <tr>
              <td>手机验证 </td>
              <td>50亚太币</td>
              <td>个人中心完善资料获取手机验证即可领取奖励</td>
            </tr>
            <tr>
              <td>邮箱验证</td>
              <td>1亚太币</td>
              <td>个人中心完善资料获取邮箱验证即可领取奖励</td>
            </tr>
          </table>

          <p>活动规则：</p>

          <ol class="number-list">
            <li>此优惠获取的投注奖金仅限亚太娱乐老虎机进行游戏，需独立使用、不与转账红利共享。</li>
            <li>本活动旨在让用户免费体验[亚太娱乐]部分游戏和以及我们的服务。</li>
            <li>验证手机号后可获得50个亚太币，免费转一次亚太大转盘，最高可得188元.</li>
            <li>邮箱验证在收到验证码短信后，需在10分钟内填写并提交，逾期则无效。</li>
            <li>亚太娱乐秉承公平公正原则，如发现任何人或团体以不诚实的方式合伙套取红利或其他利益，将取消并回收该IP下所有会员帐号的优惠以及优惠产生的盈利。亚太娱乐有权冻结账号及资金，并不另行通知玩家。（同一帐户／家庭／户籍地址／电邮地址／电话号码／银行卡／ IP地址／共享计算机环境等，关联账号不得参与此活动）</li>
            <li>亚太娱乐保留在任何时候终止或修改本活动规则及内容，最终解释权归亚太娱乐所有。</li>
          </ol>
        </div>
        <p class="hide hand" @click="hide(6)">点击收起</p>
      </div>
    </div>

    <!-- 10 -->
    <div class="activity-detail" v-if="parseInt(ob.category) === 0 || parseInt(ob.category) === 4">
      <p class="title-img hand" @click="changeShow(7)">
        <img src="../../assets/images/pmbnr_10.jpg" width="100%" height="100%"/>
        <span class="dl" ref="down7"></span>
      </p>
      <div class="content" style="display: none" ref="content7">
        <div class="h5">
          <h1>轻松一点 如您所愿！</h1>
        </div>
        <div class="h5">
          <p class="weight">活动时间：长期有效</p>
        </div>

        <table>
            <tr>
              <td colspan="3">再存100%优惠</td>
            </tr>
            <tr>
              <td>签到级别 </td>
              <td>员等级</td>
              <td>每日签到奖励 </td>
            </tr>
            <tr>
              <td>普通签到 </td>
              <td>LV0</td>
              <td>奖励：1亚太币 </td>
            </tr>
            <tr>
              <td>白银签到 </td>
              <td> LV1</td>
              <td>奖励：2亚太币 </td>
            </tr>
            <tr>
              <td> 黄金签到  </td>
              <td>LV3</td>
              <td>奖励：3亚太币 </td>
            </tr>
            <tr>
              <td>钻石签到 </td>
              <td>LV5</td>
              <td>奖励：5亚太币 </td>
            </tr>
          </table>
        <div class="txt">
          <p>活动规则:</p>
          <ol class="number-list">
            <li>每日签到即可得亚太币，会员当天首次登录之后，由系统自动派发。</li>
            <li>亚太币可用于【亚太大转盘】抽奖活动，亦可在即将上线的【亚太商城】中兑换各种丰富奖品。</li>
            <li>亚太娱乐秉承公平公正原则，如发现任何人或团体以不诚实的方式合伙套取红利或其他利益，将取消并回收该IP下所有会员帐号的优惠以及优惠产生的盈利。亚太娱乐有权冻结账号及资金，并不另行通知玩家。（同一帐户／家庭／户籍地址／电邮地址／电话号码／银行卡／ IP地址／共享计算机环境等，关联账号不得参与此活动）</li>
            <li>亚太娱乐保留在任何时候终止或修改本活动规则及内容，最终解释权归亚太娱乐所有。</li>
          </ol>
        </div>

        <p class="hide hand" @click="hide(7)">点击收起</p>
      </div>
    </div>

    <div v-if="parseInt(ob.category) === 3" class="no-data">
      暂无优惠活动
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      isShown: false
    };
  },
  props: ["ob"],
  methods: {
    changeShow(i) {
      let tag = "down" + i;
      let block = "content" + i;
      if (this.$refs[block].style.display === "block") {
        this.hide(i);
      } else {
        this.$refs[tag].style.display = "none";
        this.$refs[block].style.display = "block";
      }
    },
    hide(i) {
      let tag = "down" + i;
      let block = "content" + i;
      this.$refs[tag].style.display = "block";
      this.$refs[block].style.display = "none";
    },
    showMe() {
      this.isShown = true;
    },
    hideMe() {
      this.isShown = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/stylesheets/public";


.number-list {
  margin-left: 40px;
}

.number-list > li {
  list-style-type: decimal;
}

.number-list > li > table {
  margin-top: 10px;
}

h1 {
  font-size: $font-h2;
}
h2 {
  font-size: $font-h3;
}
.weight {
  font-weight: bold;
}
.red {
  color: $color-red;
}
.yellow {
  color: $color-yellow13;
}
.activity-detail {
  width: 100%;
  background-color: $color-blue8;
  margin-bottom: 10px;
  color: $color-white;
  .title-img {
    width: 100%;
    height: 148px;
    position: relative;
    .dl {
      position: absolute;
      bottom: 0px;
      left: 0px;
      right: 0px;
      height: 20%;
      background: rgba(0, 0, 0, 0.5);
      cursor: pointer;
      &:before {
        content: "";
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid $color-yellow13;
        position: absolute;
        bottom: 32%;
        right: 50%;
      }
    }
  }
  .content {
    padding: 30px 40px;
    .center {
      text-align: center;
      font-size: $font-h3;
      font-weight: bold;
      padding: 10px 0px;
    }
    .txt {
      padding-bottom: 30px;
    }
    .h5 {
      padding-bottom: 20px;
    }
    .hide {
      color: $color-yellow13;
      background-color: $color-blue9;
      padding: 10px 0;
      border-radius: 20px;
      text-align: center;
    }
    p {
      color: rgba($color-white, 0.8);
      font-size: $font-h4;
      text-align: justify;
    }
  }
  .table-rebate {
    th {
      width: 120px;
      background-color: rgba($color-white, 0.05);
    }
  }
}
table {
  border-collapse: collapse;
  margin-bottom: 20px;
  margin-top: 20px;
}

table,
th,
td {
  border: $px solid $color-blue8;
}
table {
  background-color: $color-blue9;
  table-layout: fixed;
  width: 100%;
  .name {
    font-size: $font-h4;
  }
  tr {
    width: 100%;
  }
  td {
    text-align: center;
    vertical-align: middle;
    padding: 10px;
    width: 33.3%;
  }
  th {
    width: 33%;
    padding: 10px 0px;
  }
}

.table-margin {
  margin: 20px;
}
</style>

<style lang="scss">
#tabsung {
  margin-bottom: 20px;
  .tabs-component {
    border: 1px solid #2647a2;
    padding: 20px;
    ul.tabs-component-tabs {
      li.tabs-component-tab {
        background: #2647a2;
        display: inline-block;
        margin: 0 5px;
        padding: 15px 10px;
        border: 1px solid #2647a2;
        a.tabs-component-tab-a {
          color: #fff;
          text-decoration: none;
          display: block;
          width: 100%;
          height: 100%;
        }
        &.is-active{
          background: #efce68;
          a.tabs-component-tab-a {
            color: #015aad;
          }
        }
      }
    }
  }
}
</style>
