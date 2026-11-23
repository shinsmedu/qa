// Firebase 프로젝트 shinsmedu-qa 연결값
// 이 값들은 공개돼도 괜찮은 값이에요. 실제 보안은 firestore.rules 가 담당합니다.
export const firebaseConfig = {
  apiKey: "AIzaSyCjOYErB4BNJTJkjWN1WvbCSDT2UyCusg8",
  authDomain: "shinsmedu-qa.firebaseapp.com",
  projectId: "shinsmedu-qa",
  appId: "1:690287249672:web:3b40b77dd22ae508b704bd"
};

// firestore.rules 의 teacherEmails() 와 같은 이메일 (화면 표시용)
export const TEACHER_EMAIL = "shinsmedu@gmail.com";
export const TEACHER_NAME = "신상명 선생님";
