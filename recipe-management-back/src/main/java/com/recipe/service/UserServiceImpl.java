package com.recipe.service;
import com.recipe.domain.User;
import com.recipe.repository.UserRepository;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl  implements IUserService{

    private final UserRepository userRepository;
  //  private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    //    this.passwordEncoder = passwordEncoder;
    }
@Override
    public User createUser(String username, String password) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        return userRepository.save(user);
    }
    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
