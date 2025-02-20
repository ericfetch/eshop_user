import './index.less'
// 添加图片资源导入
const img_user_cart = 'https://assets.ericengineer.com/i/2025/02/19/cart.png'
const img_user_more = 'https://assets.ericengineer.com/i/2025/02/19/more.png'

export default class EshopUser {
    _state = {
        user: null,
        token: null
    }
    constructor(params) {
        this._params = params;
        this._container = params.root;
        this._onInit = params.onInit || function () { };
        this._init()
    }

    _init() {
        const cookieStr = document.cookie || '';
        // 拆开cookie字符串，然后遍历
        if (cookieStr === '') {
            if (this._container) {
                this._render()
            }
            this._onInit(this._state)
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
                this._state.user = data;
                this._state.token = token;
                // 获取用户信息成功，触发init事件
                if (this._container) {
                    this._render()
                }
                this._onInit(this._state)

            }).catch(error => {
                console.error('Error:', error);
            });
        } else {
            if (this._container) {
                this._render()
            }
            // 未登录，触发init事件
            this._onInit(this._state)

        }
        console.log('EshopUser initialized...');
    }

    // 添加DOM创建的辅助方法
    _createElement(options) {
        const {
            tag = 'div',
            className = '',
            text = '',
            children = [],
            attrs = {},
            events = {},
        } = options;

        const element = document.createElement(tag);
        
        // 添加类名
        if (className) {
            element.className = className;
        }
        
        // 添加文本
        if (text) {
            element.textContent = text;
        }
        
        // 添加属性
        Object.entries(attrs).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        
        // 添加事件
        Object.entries(events).forEach(([event, handler]) => {
            element.addEventListener(event, handler);
        });
        
        // 添加子元素
        children.forEach(child => {
            element.appendChild(child);
        });
        
        return element;
    }

    _render() {
        const domWrapper = this._createElement({ className: 'user-login' });

        if (this._state.user) {
            // 创建用户基本信息
            const avatarImg = this._createElement({
                tag: 'img',
                attrs: {
                    src: 'https://assets.ericengineer.com/i/2025/02/19/npvpq4.png',
                    alt: ''
                }
            });

            const avatar = this._createElement({
                className: 'avatar',
                children: [avatarImg]
            });

            const userInfo = this._createElement({
                children: [
                    this._createElement({
                        className: 'name',
                        text: `hi~${this._state.user.name || '晚上好'}`
                    }),
                    this._createElement({
                        className: 'sub-title',
                        text: this._state.user.level || '普通会员'
                    })
                ]
            });

            const userBaseInfo = this._createElement({
                className: 'user-base-info',
                children: [avatar, userInfo]
            });

            // 创建提示区域
            const tips = this._createElement({
                className: 'tips',
                children: [
                    this._createElement({
                        className: 'title',
                        text: '登入購物平臺後更多優惠'
                    }),
                    this._createElement({
                        className: 'sub-title',
                        text: '登入可享，專屬優惠，貼心推薦！'
                    })
                ]
            });

            // 创建操作区域
            const actionItems = [
                { img: img_user_cart, text: '购物车' },
                { img: img_user_more, text: '我的订单' },
                { img: img_user_more, text: '我的收藏' },
                { img: img_user_more, text: '优惠券' },
                { img: img_user_more, text: '我的积分' },
                { img: img_user_more, text: '设置' }
            ];

            const actions = this._createElement({
                className: 'actions',
                children: actionItems.map(item => 
                    this._createElement({
                        className: 'action-item',
                        children: [
                            this._createElement({
                                tag: 'img',
                                attrs: {
                                    src: item.img,
                                    alt: item.text
                                }
                            }),
                            this._createElement({
                                text: item.text
                            })
                        ],
                        events: {
                            click: () => {
                                console.log(`${item.text} clicked`);
                                // 在这里添加点击处理逻辑
                            }
                        }
                    })
                )
            });

            domWrapper.append(userBaseInfo, tips, actions);
        } else {
            // 未登录状态
            const avatarImg = this._createElement({
                tag: 'img',
                attrs: {
                    src: 'https://assets.ericengineer.com/i/2025/02/19/npvpq4.png',
                    alt: ''
                }
            });

            const avatar = this._createElement({
                className: 'avatar',
                children: [avatarImg]
            });

            const userInfo = this._createElement({
                children: [
                    this._createElement({
                        className: 'name',
                        text: 'hi~晚上好'
                    }),
                    this._createElement({
                        className: 'sub-title',
                        text: '注册'
                    })
                ]
            });

            const userBaseInfo = this._createElement({
                className: 'user-base-info',
                children: [avatar, userInfo]
            });

            const tips = this._createElement({
                className: 'tips',
                children: [
                    this._createElement({
                        className: 'title',
                        text: '登入購物平臺後更多優惠'
                    }),
                    this._createElement({
                        className: 'sub-title',
                        text: '登入可享，專屬優惠，貼心推薦！'
                    })
                ]
            });

            const action = this._createElement({
                className: 'action',
                text: '立即登入',
                events: {
                    click: () => {
                        console.log('登录按钮被点击');
                        // 在这里添加登录逻辑
                    }
                }
            });

            domWrapper.append(userBaseInfo, tips, action);
        }

        this._container.appendChild(domWrapper);
    }
    

}