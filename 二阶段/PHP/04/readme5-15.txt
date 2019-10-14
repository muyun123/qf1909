 
API:手册，接口，会用（接口是后台写的）

1、 拿到接口。看是什么语言写的，搭建对应的语言环境。ok 一般后台帮搭建好的
2. 数据库还原；ok
3. 根据API实现功能：请求方式、接口路径、参数说明、返回事例


功能：留言板：每一个接口实现一个功能(一个接口实现多个功能)；传不同的参数拥有不同的功能

用户名验证；
注册
登陆
退出
发帖
顶贴
踩贴
点击加载更多

SEO:搜索引擎优化，百度搜索里面蜘蛛算法，收录，自然排名，原创文章、标签的选择、外链
SEM:百度竞价，价高的排在前面，推广

api:使用手册
	/*
	验证用户名
	请求方式：get
		接口路径：guestbook/index.php
		参数：
			m : index
			a : verifyUserName
			username : 要验证的用户名
		返回数据：
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息具体返回信息
			}
	*/
	
	/*
	用户注册
	get/post
		guestbook/index.php
			m : index
			a : reg
			username : 要注册的用户名
			password : 注册的密码
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
	*/
	
	
	/*
	用户登陆
	get/post
		guestbook/index.php
			m : index
			a : login
			username : 要登陆的用户名
			password : 登陆的密码
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
	*/
	
	
	/*
	用户退出
	get/post
		guestbook/index.php
			m : index
			a : logout
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
	*/
	
	/*
	留言
	post
		guestbook/index.php
			m : index
			a : send
			content : 留言内容
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				data : 返回成功的留言的详细信息
					{
						cid : 留言id	
						content : 留言内容 
						uid : 留言人的id
						username : 留言人的名称
						dateline : 留言的时间戳(秒)
						support : 当前这条留言的顶的数量
						oppose : 当前这条留言的踩的数量
					}
				message : 返回的信息 具体返回信息
			}
	*/
	
	
	function showList() {
		/*
		初始化留言列表
		get
			guestbook/index.php
				m : index
				a : getList
				page : 获取的留言的页码，默认为1
				n : 每页显示的条数，默认为10
			返回
				{
					code : 返回的信息代码 0 = 没有错误，1 = 有错误
					data : 返回成功的留言的详细信息
						{
							count : 总条数	
							pages : 页数 
							page : 当前页
							n : 每页显示条数
							list : [
									{
										cid : 留言id	
										content : 留言内容 
										uid : 留言人的id
										username : 留言人的名称
										dateline : 留言的时间戳(秒)
										support : 当前这条留言的顶的数量
										oppose : 当前这条留言的踩的数量
									},
									{
										cid : 留言id	
										content : 留言内容 
										uid : 留言人的id
										username : 留言人的名称
										dateline : 留言的时间戳(秒)
										support : 当前这条留言的顶的数量
										oppose : 当前这条留言的踩的数量
									}
							]
							
						}
					message : 返回的信息 具体返回信息
				}
		*/
		
/*
	顶帖
	post
		guestbook/index.php
			m : index
			a : doSupport
			cid : 对应帖子的id
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
	*/
/*
	踩贴
	post
		guestbook/index.php
			m : index
			a : doOppose
			cid : 对应帖子的id
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
	*/