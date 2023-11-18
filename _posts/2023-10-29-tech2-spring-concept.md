---
title: "스프링 개념 정리"
categories:
   
tags:
  - Spring
last_modified_at: 2023-10-12T00:25:52-01:00
---

##  스프링의 핵심

- 스프링은 프레임워크다.
- 오픈 소스 이다.
- IoC 컨테이너를 가진다.
( Inversion of Controll = 제어의 역전 , 주도권이 스프링에게 있다.
개발자가 만든 오브젝트들을 스캔해서 그 객체들을 heap 공간에 띄운다. 즉 개발자가 객체를 new해서 heap에 띄우는 것이 아닌 스프링이 관리해주는 개념) 
- 스프링은 DI를 지원한다.
(Dependency Injection = 의존성 주입 , heap에 싱글톤 개념으로 객체가 관리된다. 즉 다양한 메소드에서 객체를 공유해서 사용하게 됨 )
- 스프링은 엄청나게 많은 필터를 가지고 있다.
( 접근 권한을 단계적,다중적으로 나눈 것 , 톰캣(필터,web.xml),스프링 컨테이너(인터셉터,AoP))
- 스프링은 엄청나게 많은 어노테이션을 가지고 있다.(리플렉션,컴파일체킹)
(어노테이션, 컴파일러가 체킹 (스펠링 실수 감지 용이) 스프링에서는 어노테이션으로 주로 객체를 생성한다.(IoC) ex-> @Component(클래스 메모리에 로딩) , @Autowired (클래스 내부에 변수를 메모리에 로딩된 객체와 엮기(DI) )(리플렉션)(클래스 감서사 메소드,필드,어노테이션으로 검사,런타임시 분석))
- 스프링은 MessageConverter를 가지고 있다. 기본값은 현재 Json이다.
( 중간언어를 만든다? JSON , Java와 Python 이 통신하는 상황을 가정해보자.  MessageConverter:Jackson 이 자바 프로그램을 JSON으로 바꿔준다. (request,response)상황 둘 다)
- 스프링은 BufferedReader 와 BufferedWriter 를 쉽게 사용할 수 있다.
( 1byte : 통신단위(하나의 문자) -> 나라마다 1byte로 문자표현이 불가능한 경우가 있음 -> 유니코드:UTF-8(3Byte) , InputStream->Byte단위로 받음. InputStreamReader->문자 하나 or 배열(낭비됨) BufferedReader(가변 길이의 문자를 받을 수 있다.) BufferedReader,BuffereWriter 를 어노테이션으로 손 쉽게 사용, @ResponseBody,@RequestBody )
- 스프링은 계속 발전중이다.

## JPA란

- JPA는 Java Persistence API
( Persistence , 자바 프로그램 데이터를 DBMS에 영구히 기록할 수 있는 API  )
- 프로토콜과 인터페이스의 차이
( 인터페이스 -> 프로그램 제공자가 일방적으로 제공자가 정해놓은 규칙,약속 (상하관계가 존재) 프로토콜 -> 상호 합의하에 미리 정해진 서로 간에 통신등에 사용되는 규칙,약속(서로간 동등))
- JPA는 ORM 기술이다.
( Object Relational Mapping , database 테이블과 자바 클래스가 다르기 때문에 모델링 해야함. 일반적인 상황->Table을 먼저 만들고 자바 클래스를 만듦 . ORM-> 자바 클래스를 먼저 만들고 Database를 자동 생성 (JPA 인터페이스 규칙을 지키면 DatabaseTable이 자동으로 생성))
- JPA는 반복적인 CRUD 작업을 생략하게 해줌.
(database의 data를 단순반복으로 자바 object로 바꿔줘야 하는데 그것을 JPA로 쿼리에 대한 응답 및 ++++를 함수하나로 제공 즉 DB와의 요청 응답 CRUD를 단순하게 바꿔 줌)
- JPA는 영속성 컨텍스트를 가지고 있다.
(영속성 : 데이터를 영구적으로 저장(DB or FileSystem) , 컨텍스트 : 어떤 대상의 모든 정보 , 영속성 컨텍스트에 있는 Data와 DB에 있는 data가 동기화 , 자바는 영속성컨텍스트를 통해 DB와 통신(영속성 컨텍스트는 자바Object Type) )
- JPA는 DB와 OOP의 불일치성을 해결하기 위한 방법론을 제공한다.
( DB에서 각각은 Object를 가지지 못하고 기본형으로 가짐 때문에 Join등을 사용하여 다른 테이블에 접근해서 전체 정보를 가져와야 함.하지만 자바는 Class를 이용해 바로 접근 가능 만약 자바에서 Class 오브젝트로 멤버변수를 만들면 DB와의 불일치성이 생김 -> ORM 사용으로 해결 ( 자바가 주도권을 가지고 있는 방법 , JPA가 자동으로 해결) , 단 인터페이스 규칙을 지켜야 가능)
- JPA는 OOP의 관점에서 모델링을 할 수 있게 해준다.(상속,콤포지션,연관관계)
( 콤포지션 = 결합 (클래스에 클래스 선언), 결합된 클래스를 자동으로 DB table로 변환 , 각각의 고유키와 관계를 이용해서 만듦, class 간 공통되는 메소드가 있을 때는 class 하나를 추가로 만들어서 공통상속하자 )
- 방언 처리가 용이하여 Migration하기 좋음. 유지보수에도 좋음
( DB종류가 많은데 어디에나 적용하기 좋다. JPA에 추상화객체를 둔다. 스프링 -> JPA -> DB , 스프링에서 사용하는 JPA는 JPA를 이용하는 spring-data-jpa프레임워크이다. )
- JPA는 쉽지만 어렵다

## 스프링부트 동작 원리

1 ) 내장 톰켓을 가진다.
1-1) HTTP 
Socket : 운영체제가 제공 , ip주소:포트번호
메인 스레드 소켓과 통신할 때 마다 소켓을 새로 만들고 통신을 연결해주고 스레드로 생성 , 메인 스레드는 계속 새로운 통신을 연결받고 새로운 스레드를 만들어 준다. (time slice 동시 동작) 한번 스레드를 만들어주면 연결이 유지 (과부하) Http-> Stateless (과부화 방지), 새로운 스레드를 만들지 않음. 1회 통신 이후 선 끊음. (문서전달의 목적)
1-2) 톰켓
웹 서버 = 갑 
클라이언트 = 을
을이 갑에게 request (url(요청 주소) ,ip주소 필요 ) , 갑이 을에게 response (Http에서 갑은 을의 ip주소를 모름) -> 요청을 해야만 응답이 가능한 구조.
웹서버 : 아파치 + 톰캣
톰켓 ( JSP -> 자바 -> 컴파일 , html)
.JSP 파일 or 자바코드 요청 시 아파치가 이해X 응답이 안됨 -> 톰켓을 달아서 .JSP , 자바코드의 응답을 담당 ( .jsp -> 자바 -> 컴파일 -> .html 로 변환 -> 아파치에게 반환 -> 아파치가 response)
웹브라우저 -> js,html,css,avi etc.. 을 읽는다.

2 ) 서블릿 컨테이너

.html , .css , .png -> 아파치가 일 함 , 자바파일 요청 -> 톰켓이 일 함.
URL : 자원 접근 URI : 식별자 접근 , 스프링은 URI만 가능 특정한 파일 요청을 할 수 없다. 요청시에는 무조건 자바를 거친다.
request 요청(Java관련 자원) -> 서블릿 컨테이너(톰켓) -> 1. 서블릿 객체 생성 ( 최초 요청 일 때) -> 2. init,service(스레드1),get -> 1.1 만약 2번째 이상 요청일 때 (스레드2) init(X)... 톰캣기본스레드 개수 초과시 대기 후 response 된 스레드 재사용 (플링기법)
Scale-up = 스레드 인원 수 향상 시 컴퓨터를 단일로 업그레이드 scale-out = 컴퓨터를 병렬적으로 업그레이드

3 ) web.xml

문지기의 매뉴얼을 작성
-ServelContext의 초기 파라미터 ( 암구호 )
-Session의 유효시간 설정 ( 인증 유효시간 )
-Servlet/JSP 에 대한 정의 
-Servlet/JSP 매핑 ( 정의를 보고 매핑 )
-Mime Type 매핑 ( get방식(data_x) , 그 외 방식 Mime Type 매핑 (data_o) data변환 , data를 올바르게 보내야 함 )
-Welcome File List ( data도 없고 아무 사전정보 없이 들어온 사용자에게 주는 파일 )
-Error Pages 처리 ( 잘못된 URL -> Error Page )
-리스너/필터 설정 ( data 나 사용자 거르기->필터 , 특정 조건을 가진 사용자,data 우선적으로 검사하지 않고 데려 감 )
-보안

4 ) FrontController

web.xml에 다 정의하기 너무 힘들기 때문에 FrontController를 둔다. 특정 주소를 FrontController에 보내기.
Buffered -> request,response를 객체로 만들어 줌 (톰켓 ) 
 FrontController 가 request를 다시 생성하면서 기존에 있던 request에 덮어 씌운다. 즉 기존에 있는 request,response를 유지하는 방법.
 요청시마다 새로 만들어지기 때문에 , FrontController 에서 만들 때는 덮어 씌운다.

5 ) RequestDispatcher

필요한 클래스 요청이 도달했을 때 FrontController에 도착한 request 와 response를 그대로 유지시켜준다.
request,response 객체를 재사용해서 페이지 간 데이터이동을 실현.

6 ) DispatchServlet

FrontController + RequestDispatcher = DispatchServlet  -> 디스패처서블릿이 자동생성되어 질 때 수 많은 객체가 생성된다. 보통 필터들이다. 해당 필터들은 내가 직접 등록할 수 도 있고 기본적으로 필요한 필터들은 자동 등록 되어진다. 내부적으로 알아서 작동 됨.

7 ) 스프링 컨테이너

DispatchServlet에서 생성되는 수 많은 객체들은 어디서 관리될까?

디스패처서블릿이 컴포넌트 스캔으로 all 스캔해서 필요한 것들을 new 해준다.(어노테이션 기법) , @Controller,@RestController,@Configration,@Repository,@Service etc..... 이 후 해당 class에 주소 배정
ContextLoaderListener( root_ApplicationContext 파일) -> 쓰레드별로 다른 객체가 아닌 공통적인 객체를 관리(DB)

ApplicationContext
DispatcherServlet에 의해 생성되어지는 수 많은 객체들은 ApplicationContext에서 관리된다. 이것을 IoC라고 한다.
IoC란 제어의 역전을 의미한다. 개발자가 직접 new를 통해 객체를 생성하게 된다면 해당 객체를 가르키는 레퍼런스 변수를 관리하기 어렵다. 그래서 스프링이 직접 해당 객체를 관리한다. 이때 우리는 주소를 몰라도 된다. 왜냐하면 필요할 때 DI하면 되기 때문이다.
DI를 의존성 주입이라고 한다. 필요한 곳에서 ApplicationContext에 접근하여 필요한 객체를 가져올 수 있다. ApplicationContext는 싱글톤으로 관리되기 때문에 어디에서 접근하든 동일한 객체라는 것을 보장해준다.

