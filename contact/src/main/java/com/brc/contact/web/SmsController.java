package com.brc.contact.web;

import com.brc.contact.vo.UserVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created with IntelliJ IDEA.
 * Description:
 * User: zhangxiuzhi
 * Date: 2018-09-14
 * Time: 23:34
 */
@RestController
public class SmsController {


    // 哈哈 .
    private static Logger logger = LoggerFactory.getLogger(SmsController.class);


    /** haha .
     * @param name 传入的姓名
     * @return 返回处理后的姓名
     */
    @RequestMapping("/hello")
    public String sayHello(final String name) {
        logger.info(" say Hello {}", name);
        return "hello " + name;
    }


    /**
     * 演示对象传递
     * @param userVo
     * @return
     */
    @RequestMapping("/user")
    public UserVo user(@RequestBody final UserVo userVo){
        Assert.notNull(userVo,"传入对象不能为空");
        Assert.notNull(userVo.getUserName(),"姓名不能为空");
        userVo.setEmail("zhangxiuzhi@sohu.com");
        return userVo;
    }

}
