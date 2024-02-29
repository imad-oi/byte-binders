package com.byteBinders.springbootlibrary.controller;

import com.byteBinders.springbootlibrary.entity.Message;
import com.byteBinders.springbootlibrary.requestmodels.AdminQuestionRequest;
import com.byteBinders.springbootlibrary.service.MessageService;
import com.byteBinders.springbootlibrary.utils.ExtractJWT;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin("http://localhost:5173")
public class MessageController {

    private MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/secure/add/message")
    public void postMessage(@RequestHeader(value = "Authorization") String token,
                            @RequestBody Message messageRequest
    ) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        messageService.postMessage(messageRequest, userEmail);
    }

    @PutMapping("/secure/admin/message")
    public void putMessage(@RequestHeader(value = "Authorization") String token,
                           @RequestBody AdminQuestionRequest adminQuestionRequest)
            throws Exception {
        String adminEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) throw new Exception("Administration page only.");
        messageService.putMessage(adminQuestionRequest, adminEmail);
    }
}
