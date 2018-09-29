package com.brc.port.service;


import com.alicp.jetcache.anno.CacheType;
import com.alicp.jetcache.anno.Cached;
import com.brc.port.vo.UserVo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Created with IntelliJ IDEA.
 * Description:
 * User: zhangxiuzhi
 * Date: 2018-09-14
 * Time: 23:42
 */
@FeignClient(name = "contact",fallback = ContactClientFallback.class)
public interface ContactClient {
    @RequestMapping(value = "/hello", method = RequestMethod.POST)
    @Cached(name="sayHello-name-",expire=100,cacheType = CacheType.REMOTE)
    String sayHello(@RequestParam("name") String name);

    @RequestMapping(value = "/user", method = RequestMethod.POST)
    @Cached(name="user-name-",expire=100,cacheType = CacheType.REMOTE)
    UserVo user(@RequestBody UserVo userVo);


}

@Component
class ContactClientFallback implements ContactClient{

    @Override
    public String sayHello(String name) {
        return "no thanks";
    }

    @Override
    public UserVo user(UserVo userVo) {
        return null;
    }

}