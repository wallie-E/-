$(function(){
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })


    $('#link_login').on('click',function(){
        $('.reg-box').hide()
        $('.login-box').show()
    })
    
    // 监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        $.post('/api/reguser',{
            username:$('#form_reg [name=username]').val(),
            password:$('#form_reg [name=password]').val()
        },function(res){
            if(res.status!==0){
                console.log('请求成功了',res)
                return alert(res.message)
            }
            alert('注册成功了，请登录')

            // 模拟人的点击行为
            $('#link_login').click()
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            // 快速获取表单中的数据
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return alert('登录失败！')
                }
                alert('登录成功')

                // 将登录成功得到的 token 字符串，保存到 localstorage 中
                localStorage.setItem('token',res.token)
                location.href='/index.html'

            }
        })
    })
})