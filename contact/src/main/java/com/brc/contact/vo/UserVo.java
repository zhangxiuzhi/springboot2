package com.brc.contact.vo;

import java.io.Serializable;

/**
 * Created with IntelliJ IDEA.
 * Description:
 * User: zhangxiuzhi
 * Date: 2018-09-29
 * Time: 9:27
 */
public class UserVo implements Serializable {

    String userName;
    String password;
    String email;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
