---
title: "응용계층"
categories:
  - Network
tags:
   
last_modified_at: 2023-10-17T00:25:52-01:00
---

## 목차

1 ) 네트워크 어플리케이션의 원리
2 ) 웹과 HTTP
3 ) 이메일,SMTP,IMAP
4 ) DNS
5 ) P2P
6 ) Video Streaming
7 ) 소켓프로그래밍

## 네트워크 어플리케이션

Creating a network app , Application 개발 시 응용계층만 신경쓰면 된다.

클라이언트-서버 패러다임 , 서버 = 고정 ip 클라이언트 = 유동 ip ex / HTTP , 파일다운로드

Peer-peer 구조 , 엔드시스템끼리 직접 통신 , 매번 경로가 바뀌고 홈 네트워크의 UpStream 속도가 느리기 때문에 약간의 제약이 있다.

소켓 , 프로세스의 출입구.

Addressing processes , 메시지를 주고 받을 때 반드시 식별자(identifier)가 필요함.

식별자는 ip주소와 포트넘버를 포함함.

## 어플리케이션이 필요한 전송 서비스는?

data integrity 데이터 무결성 이 데이터가 원하는 데이터가 맞는지? 신뢰할 수 있는지

Timing 지연 , 실시간 반응이 필요한지 아닌지 지연이 적을 수록 좋긴 하다.

Throughput 처리량 , 시간 당 전송되는 데이터의 양 몇몇 앱은 효과적이기 위해 최소 보장하는 데이터 양을 선호 다른 앱은 탄성적으로 가져갑니다.

Security 보안 


## TCP / UDP

TCP -> 믿을 만 하다. (신뢰성 O 보안 X) 핸드쉐이킹이란 별칭으로 서로 연결을 확인한 후 전송하기 때문에 데이터 무결성이 보장된다. 

UDP -> 보내기만 하고 데이터를 수신여부를 확인하지 않는다. 대신 속도가 비교적 빠르다.

## 웹과 HTTP

웹페이지는 HTML-file 을 베이스로하고 몇몇 참조객체나 URL,등등 을 포함한다.

HTTP는 Hypertext transfer protocol 로 일종의 프로토콜이다.

HTTP 는 TCP를 사용하며 stateless 하다.즉 상태를 저장하지 않는다(고객이 전에 어떤 요청을 했는지 유지하지 않음. )

HTTP 연결 : 두개의 타입

1 ) Non-persistent
HTML 파일과 여러개의 Jpeg 오브젝트로 구성되어있는 웹페이지를 가정하자. 각각에 대해서 매번 반복해야 한다.

2 ) Persistent
필요한 모든 파일의 전송이 끝날 때 까지 커넥션을 열어둬서 반복할 필요는 없는 방법이다.

## HTTP 메시지

HTTP 메시지에는 두개의 타입이 있다. request,response

## HTTP request messages

POST method form 형태로 정보 전달(body에 메시지)
HEAD method GET과 비슷
GET method URL에 데이터를 포함
PUT method 업데이트 용

## HTTP response status codes

200 OK , 301 Moved Permanently , 400 Bad Request

## 브라우저 캐시

캐시 유효 시간이 초과해도, 서버의 데이터가 갱신되지 않으면
304 Not Modified + 헤더 메타 정보만 응답 (바디 X)
클라이언트는 서버가 보낸 응답 헤더 정보로 캐시의 메타 정보를 갱신
클라이언트는 캐시에 저장되어 있는 데이터 재활용
결과적으로 네트워크 다운로드가 발생하지만 용량이 적은 헤더 정보만 다운로드하게 된다.

## 쿠키

등장이유 -> HTTP의 Stateless를 극복하기 위해

쿠키의 4가지 구성요소

1 ) HTTP response message 안에 쿠키 헤더라인

2 ) 다음 HTTP 요청 메시지 안에 쿠키 헤더라인(HTTP response 메시지 바로 다음 등장)

3 ) 클라이언트 컴퓨터에 저장되는 쿠키파일 , 관리 브라우저

4 ) 웹사이트에서 사용자들의 쿠키파일을 관리할 데이터베이스

처음 방문하는 클라이언트가 HTTP request 를 보내면 웹 서버에서 쿠키네임을 설정해서 response 메시지안에 넣어서 보낸다. (1)

클라이언트 컴퓨터내부에 관리 브라우저가 쿠키파일을 저장한다(3)

클라이언트가 동일 서버에 request를 보낼 시 HTTP요청 메시지 안에 쿠키 헤더라인을 넣는다(2)

쿠키에 따라 response해야 함으로 서버에 쿠키파일을 관리하는 DB가 필요하다.(4)



# 웹 캐싱 (프록시 서버)

필요한 이유 

1 ) 특정 정보는 유저에게 다이렉트로 보낼 수 있음(기다리는 시간 감소)

2 ) 내부에서 사용하면 트래픽을 줄일 수 있음.

3 ) 효과적인 컨텐츠 제공

## RTT (RoundTripTime)

엔드시스템에서 특정네트워크 경로를 거쳐 다시 엔드시스템으로 돌아오는 시간.

# HTTP2 

선입선출방식의 HTTP를 스케줄링해 단점을 보완했다.

# E-mail

세가지 주요 구성 요소

User agents , mail servers , SMTP

user agent -> mail reader
mail servers -> 메일저장소,메세지 큐(메세지 전송 대기열)
SMTP protocol ->메일서버간의 이메일 전송
client -> 메일을 서버에 보낸다
server -> 메일을 받는다.

 user agent 가 메일을 mail server에 보내고 유저의 메일서버와 도착지 유저의 mail server간 통신이 일어난 후 도착지 유저의 메일박스에 메일이 놓여져 최종적으로 통신이 완료된다.
 
 ##

