package com.recipe.service;

import com.recipe.domain.User;


public interface IUserService {


    public User createUser(String username,String password);

    public User getUserByUsername(String username);
}
