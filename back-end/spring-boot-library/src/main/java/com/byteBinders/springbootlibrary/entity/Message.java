package com.byteBinders.springbootlibrary.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "messages")
@Data
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String question;

    private String userEmail;
    private String adminEmail;
    private String response;

    private boolean closed;


    public Message() {
    }

    public Message(String title, String question) {
        this.title = title;
        this.question = question;
    }
}
