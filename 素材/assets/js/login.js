$(function() {
    //请求的路径
    var reurl = 'http://www.liulongbin.top:3007';

    //点击注册帐号链接
    $('#link_reg').on('click', function() {
            $('.login-box').hide();
            $('.reg-box').show();
        })
        //点击登录链接
    $('#link_login').on('click', function() {
            $('.login-box').show();
            $('.reg-box').hide();
        })
        //从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    //自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value, item) {
            //校验两次密码是否一致
            var pwd = $('.reg-box [name=password]').val();
            if (value != pwd) return '俩次密码不一致！'
        }
    });

    //监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        var username = $('#form_reg [name=username]').val();
        var password = $('#form_reg [name=password]').val();
        $.post(reurl + '/api/reguser', { username: username, password: password }, function(data) {
            // console.log(data);
            if (data.status != 0) return layer.msg(data.message);
            layer.msg(data.message);
            //注册成功 模拟a链接提交表单
            $('#link_login').click();
        })

    })

    //监听登陆表单的提交事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        var username = $('#form_login [name=username]').val();
        var password = $('#form_login [name=password]').val();
        $.ajax({
            url: reurl + '/api/login',
            method: 'post',
            data: {
                username: username,
                password: password
            },
            success: function(data) {
                if (data.status != 0) return layer.msg(data.message);
                layer.msg(data.message);
                //登陆成功以后 保存token值在localStorage中
                localStorage.setItem('token', data.message);
                console.log(data.token);
                //登陆成功 跳转到登陆页面
                location.href = '/index.html';
            }

            // token值：
            // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzYyMywidXNlcm5hbWUiOiJ3YTEiLCJwYXNzd29yZCI6IiIsIm5pY2tuYW1lIjoiIiwiZW1haWwiOiIiLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTY0MjI0MTY2MywiZXhwIjoxNjQyMjc3NjYzfQ.PYSW8bfPXYvDAaGy3UbqS7cqba5CohaoIYUF6Bj0nSk
        });
    })

})