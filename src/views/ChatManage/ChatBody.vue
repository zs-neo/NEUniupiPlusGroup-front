<template>
	<div class="chat">
		<div class="head-wrapper">
			<div class="-left">
				<a href="http://mp.weixin.qq.com/s?__biz=MzAwMjAzNDU1NQ==&mid=401448725&idx=1&sn=2247d58a5c75e237b0d5f9f14ff42e56#rd">
					<i class="iconfont icon-keaide"></i>
				</a>
				<a href="http://www.redream.cn/main/treehole.php">
					<i class="iconfont icon-tree"></i>
				</a>
			</div>
			<div class="-mid">
				<p class="group-name">客服中心</p>
			</div>
		</div>
		<div class="body-wrapper">
			<template>
				<div v-for="(obj,index) in messages">
					<div class="self-wrap" v-if="obj.type">
						<span class="-header" style="background-color:white">我</span>
						<div class="-msg">{{obj.msg}}</div>
					</div>
					<div class="other-wrap" v-if="!obj.type">
						<span class="-header" style="background-color:white">小姐姐</span>
						<span class="-name">客服小姐姐</span>
						<div class="-msg">{{obj.msg}}</div>
					</div>
				</div>
			</template>
		</div>
		<div class="foot-wrapper">
			<input class="chat-input" type="text" name="" v-model="input">
			<span class="chat-sub" :class="{'primary':!!input}" @click="send(input)">发送</span>
		</div>
	</div>
</template>

<script>
	import OtherMsg from './OtherMsg'
	import SelfMsg from './SelfMsg'
	import SystemMsg from './SystemMsg'

	export default {
		data() {
			return {
				messages: [{
						msg: "123",
						type: true
					},
					{
						msg: "111",
						type: false
					},
					{
						msg: "111",
						type: true
					}
				],
				name: '我',
				clientId: '1',
				username: '',
				input: "",
				webSocket: null,
			}
		},
		created() {
			// 页面打开就建立连接，根据业务需要
			this.initSocket()
		},
		destroyed() {
			// 页面销毁关闭连接
			this.webSocket.close()
		},
		components: {
			OtherMsg,
			SelfMsg,
			SystemMsg
		},
		methods: {
			// 建立连接
			initSocket() {
				// 有参数的情况下：
				let url = `ws://localhost:8082/chat`
				this.webSocket = new WebSocket(url)
				this.webSocket.onopen = this.webSocketOnOpen
				this.webSocket.onclose = this.webSocketOnClose
				this.webSocket.onmessage = this.webSocketOnMessage
				this.webSocket.onerror = this.webSocketOnError
			},
			// 建立连接成功后的状态
			webSocketOnOpen() {
				this.webSocket.send("getall");
				console.log('websocket连接成功');
			},
			webSocketOnMessage(res) {
				console.log(res);
				this.webSocket.send("发送数据");
			},
			// 关闭连接
			webSocketOnClose() {
				this.webSocket.close()
				console.log('websocket连接已关闭');
			},
			//连接失败的事件
			webSocketOnError(res) {
				console.log('websocket连接失败');
				// 打印失败的数据
				console.log(res);
			},
			send(msg) {
				console.log(this.$emit('fun'))
				
				let info = {
					'id': this.clientId,
					'name': 'username',
					'msg': this.input
				}
				this.webSocket.send("back=" + this.clientId + "=" + JSON.stringify(info));
				let temp = {
					'msg': this.input,
					'type': true
				};
				this.messages.push(temp)
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
	html {
		height: 100%;
	}

	body {
		height: 100%;
	}

	.chat {
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: space-between;
	}

	.body-wrapper {
		background-color: #f6f6f6;
		height: ~'calc(100% - 90px)';
		overflow-y: scroll;
	}

	.foot-wrapper {
		background-color: #f1f1f1;
		height: 40px;
		flex-shrink: 0;
		display: flex;
		padding: 5px 10px;
		justify-content: space-between;
		border-top: solid 1px rgba(0, 0, 0, 0.1);

		.chat-input {
			height: 100%;
			width: 80%;
			border-radius: 10px;
			outline: none;
			border: none;
			box-sizing: border-box;
			padding: 5px;
		}

		.chat-sub {
			display: flex;
			background-color: rgba(0, 0, 0, 0.1);
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 18%;
			border-radius: 10px;
			outline: none;
		}

		.primary {
			background-color: #3CAF36;
		}
	}

	.head-wrapper {
		background-color: #34352c;
		height: 50px;
		flex-shrink: 0;
		display: flex;
		justify-content: space-between;

		.-left {
			display: flex;
			flex-shrink: 0;
			height: 100%； width；70px;
			min-width: 70px;
			align-items: center;
			justify-content: space-around;

			.icon-keaide,
			.icon-tree {
				font-size: 28px !important;
				color: #fff;
			}

			a {
				text-decoration: none;
			}
		}

		.-mid {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			color: #fff;
		}

		.-right {
			display: flex;
			align-items: center;
			height: 100%;
			width: 50px;
			justify-content: center;

			.icon-group {
				font-size: 30px !important;
				color: #fff;
			}
		}
	}

	.self-wrap {
		/*background-color: #666;*/
		padding: 5px 5px 0 5px;
		position: relative;
		overflow: hidden;

		.-header {
			position: relative;
			left: ~'calc(100% - 50px)';
			display: inline-flex;
			align-items: center;
			justify-content: center;
			background-color: #905;
			height: 50px;
			width: 50px;
			border-radius: 50%;
			font-weight: bolder;
		}

		.-msg {
			background-color: #fff;
			padding: 10px;

			float: right;
			position: relative;
			left: -60px;
			top: 0px;
			border-radius: 6px;
			max-width: ~'calc(100% - 180px)';
			font-size: 16px;

			&:before {
				content: '';
				display: inline-block;
				height: 0;
				width: 0;
				border-left: solid 10px #fff;
				border-top: solid 6px transparent;
				border-bottom: solid 6px transparent;
				position: absolute;
				top: 5px;
				left: 100%;
			}
		}
	}

	.other-wrap {
		padding: 5px 5px 0 5px;
		position: relative;

		.-header {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			background-color: #905;
			height: 50px;
			width: 50px;
			border-radius: 50%;
			font-weight: bolder;
		}

		.-name {
			/*background-color: #fff;*/
			position: absolute;
			font-size: 14px;
			padding: 2px;
			margin: 0 10px;
			color: #999;
		}

		.-msg {
			/*display: inline-flex;*/
			background-color: #fff;
			padding: 10px;
			position: relative;
			left: 60px;
			top: -20px;
			border-radius: 6px;
			max-width: ~'calc(100% - 380px)';
			font-size: 16px;

			&:before {
				content: '';
				display: inline-block;
				height: 0;
				width: 0;
				border-right: solid 10px #fff;
				border-top: solid 6px transparent;
				border-bottom: solid 6px transparent;
				position: absolute;
				top: 5px;
				left: -8px;
			}
		}
	}
</style>
