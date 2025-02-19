import './index.less'
export default class EshopUser {
    state = {
        user: null,
        token: null
    }
    constructor(params) {
        this._params = params;
        this._container = params.root;
        this.onInit = params.onInit || function () { };
        this._init()
    }

    _init() {
        const cookieStr = document.cookie || '';
        // 拆开cookie字符串，然后遍历
        if (cookieStr === '') {
            if (this._container) {
                this._render()
            }
            this.onInit(this.state)
            return;
        }
        const cookies = {}
        cookieStr.split(';').forEach(function (cookie) {
            var parts = cookie.split('=');
            var name = parts[0].trim();
            var value = parts[1].trim();
            cookies[name] = value;
        });
        // 取出代表用户token
        const token = cookies['eshop_token'];

        if (token) {
            //    调用接口，获取用户信息
            fetch('/api/user').then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            }).then(data => {
                this.state.user = data;
                this.state.token = token;
                // 获取用户信息成功，触发init事件
                if (this._container) {
                    this._render()
                }
                this.onInit(this.state)

            }).catch(error => {
                console.error('Error:', error);
            });
        } else {
            if (this._container) {
                this._render()
            }
            // 未登录，触发init事件
            this.onInit(this.state)

        }
        console.log('EshopUser initialized...');
    }

    _render() {
        // 渲染UI
        const domWrapper = document.createElement('div');
        domWrapper.classList.add('user-login');

        if (this.state.user) {
            domWrapper.innerHTML = `
            <div class="user-base-info">
                <div class='avatar'>
                    <img src="https://assets.ericengineer.com/i/2025/02/19/npvpq4.png" alt="" />
                </div>
                <div>
                    <div class="name">hi~晚上好</div>
                    <div class="sub-title">注册</div>
                </div>
            </div>
            <div class="tips">
                <div class="title">
                    登入購物平臺後更多優惠
                </div>
                <div class="sub-title">登入可享，專屬優惠，貼心推薦！</div>
            </div>

            <div className="actions">
            <div className="action-item">
              <img src={img_user_cart} alt="" />
              <div>购物车</div>
            </div>
            <div className="action-item">
              <img src={img_user_more} alt="" />
              <div>购物车</div>
            </div>
            <div className="action-item">
              <img src={img_user_more} alt="" />
              <div>购物车</div>
            </div>
            <div className="action-item">
              <img src={img_user_more} alt="" />
              <div>购物车</div>
            </div>
            <div className="action-item">
              <img src={img_user_more} alt="" />
              <div>购物车</div>
            </div>
            <div className="action-item">
              <img src={img_user_more} alt="" />
              <div>购物车</div>
            </div>
          </div>
            
            
            `
        } else {
            domWrapper.innerHTML = `
             <div class="user-base-info">
                <div class='avatar'>
                    <img src="https://assets.ericengineer.com/i/2025/02/19/npvpq4.png" alt="" />
                </div>
                <div>
                    <div class="name">hi~晚上好</div>
                    <div class="sub-title">注册</div>
                </div>
            </div>
            <div class="tips">
                <div class="title">
                    登入購物平臺後更多優惠
                </div>
                <div class="sub-title">登入可享，專屬優惠，貼心推薦！</div>
            </div>
            <div class="action">
                立即登入
            </div>
            `
        }


        this._container.appendChild(domWrapper)
    }

}