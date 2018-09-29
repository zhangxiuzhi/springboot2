package com.brc.port.vo;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

/**
 * Created with IntelliJ IDEA.
 * Description:
 * User: zhangxiuzhi
 * Date: 2018-09-29
 * Time: 9:33
 */
public class UserVo implements Serializable {

    String userName;
    String password;
    @JsonProperty(value = "email")
    String email1;
    String address;


    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail1() {
        return email1;
    }

    public void setEmail1(String email) {
        this.email1 = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
