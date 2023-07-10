---
title: "깃허브 블로그 기초"
categories:
  
tags:
  - Git 
last_modified_at: 2023-07-07T14:25:52-05:00
---

깃허브 블로그 제작 방법과 오류 해결

## 깃허브 블로그 제작 과정

1. ruby 설치 
2. jekyll 테마 고른 뒤 저장소 fork 하기
3. fork 한 저장소에 bundle 설치
4. 터미널에서 $bundle exec jekyll serve (--trace) 로컬에서 사용 가능 로컬서버 주소는 http://127.0.0.1:4000/ 
5. git 저장소 이름 변경 후 brach save 하면 일반적으로 username.github.io domain 에 깃허브 블로그 배포 가능   

## 관련 오류와 해결 방법

1. ruby의 버전을 2.xx 로 맞추는 것이 버그가 덜 나온다고 한다 (stackoverflow
검색결과) jekyll 테마와 호환성 문제 발생
2. 1번으로 수행해도 잘 안될시 받은 테마의 Gemfile.lock 에 가서 버전호환을 확인해야 한다

## 배포 중 발생했던 오류

로컬에서는 정상적으로 작동하던 웹페이지가 깃허브에 올려 배포를 하려니 제대로 작동하지 않았다. 다시 확인해 보니 Github Action이 제대로 발동되지 않았다. 오류코드를 자세히 살펴보니 내가 사용한 Jekyll 테마가 존재하지 않는다는 오류였는데 템플릿 코드를 비교해가며 그대로 갖다 써도 안되었다. 

해결책 : 환결설정 config.yml 에서 theme를 직접 연결이 아닌 remote_theme로 간접연결해야 해결이 되었다. 원인은 깃허브가 기본적으로 지원하는 테마에 내가 쓰던 테마가 들어있지 않아서 였다. 자세한 부분은 Jekyll 과 깃허브의 관계에 대해서 좀 더 공부가 필요할 것 같다. 