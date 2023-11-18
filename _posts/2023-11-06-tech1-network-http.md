---
title: "Http"
categories:
  - Network
tags:
   
last_modified_at: 2023-07-14T00:25:52-01:00
---


## 4가지 통신 방법

클라이언트 입장에서 서버에게
Get = 데이터를 줘 
Post = 데이터를 추가해줘
Put = 데이터를 수정해줘
Delete = 데이터를 삭제해줘

## Stateless , Statefull

한번 응답 일어나면 선을 끊어버림.

요청시마다 스트림을 연결해서 Data를 주고 받는 방식 Stateless( 서버 부하 줄임 ) (http)
-> 고민해볼 것 , 어떻게 http로 session을 유지하지? 보안 etc...

statefull (연결을 지속)

## MIME 타입

헤더 = Data 설명  
바디 = Data

MIME타입이란 전송된 문서의 다양성을 알려주기 위한 메커니즘.

type/subtype

ex) text/plain
text/html
image/jpeg
audio/ogg
video/mp4 etc.....
