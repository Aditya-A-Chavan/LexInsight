# LexInsight - AI-Powered Legal Expertise Platform  
![LexInsight Logo](frontend/public/logo.png)

---

## Problem Statement  
In many jurisdictions, lawyers face strict regulations that prevent them from marketing their services directly. This creates a significant challenge for legal professionals to expand their reach and connect with potential clients while remaining compliant with legal advertising restrictions.

## Our Solution  
LexInsight is an innovative platform that enables lawyers to showcase their expertise and connect with potential clients through AI-powered document analysis and insights, without violating marketing regulations. By focusing on knowledge sharing and expertise demonstration rather than direct marketing, we provide a compliant solution for legal professionals to expand their reach.

---

## Overview  
LexInsight is a sophisticated legal expertise platform that leverages artificial intelligence to analyze legal documents and provide intelligent insights. The platform enables lawyers to demonstrate their expertise through high-quality content analysis and insights, while helping clients find the right legal expertise through an intelligent matching system.

---

## Features  

### Core Features  
- **Expertise Demonstration**: Lawyers can showcase their knowledge through AI-analyzed document insights  
- **Smart Client Matching**: AI-powered system matches legal needs with appropriate expertise  
- **Document Analysis**: Advanced analysis of legal documents using Google's Generative AI  
- **Knowledge Repository**: Secure storage and retrieval of legal insights and analyses  
- **Compliance-First Approach**: Platform designed to comply with legal marketing regulations  
- **Cross-Platform Accessibility**: Accessible across desktop and mobile devices  

### Technical Features  
- **Robust Backend Services**: Enterprise-grade Spring Boot microservices architecture  
- **Real-time Processing**: Efficient document analysis with immediate insights  
- **Advanced Search**: Full-text search with optimized performance  
- **Secure Data Management**: Reliable data storage using PostgreSQL and MongoDB  
- **Comprehensive API**: Well-documented RESTful APIs with Swagger/OpenAPI  
- **Automated Testing**: Extensive test coverage ensuring reliability  

---

## Tech Stack  

### Backend

![Java](https://img.shields.io/badge/Java-21-blue?logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.4-success?logo=springboot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-6-green?logo=mongodb&logoColor=white)
![Gradle](https://img.shields.io/badge/Gradle-8-02303A?logo=gradle&logoColor=white)
![JUnit](https://img.shields.io/badge/JUnit-5-red?logo=java&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-API-orange?logo=swagger&logoColor=white)
![Google AI](https://img.shields.io/badge/Google%20Generative%20AI-Enabled-blue?logo=google&logoColor=white)

### Frontend  

![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-blue?logo=tailwindcss)
![React Context API](https://img.shields.io/badge/State%20Management-React%20Context-61DAFB?logo=react)
![React Hook Form](https://img.shields.io/badge/Forms-React%20Hook%20Form-EC5990?logo=reacthookform&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-HTTP%20Client-5A29E4?logo=axios&logoColor=white)
![Markdown](https://img.shields.io/badge/React%20Markdown-Markdown-lightgrey)
![Lucide](https://img.shields.io/badge/Lucide-Icons-blueviolet)

---

## Getting Started  

### Prerequisites  
- Java 21 JDK (for backend)  
- PostgreSQL 15+  
- MongoDB 6+  
- Gradle 8+  
- Node.js 18+ (for frontend)  

### Installation  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/yourusername/lexinsight.git
   cd lexinsight
   ```

2. **Backend Setup**
   ```bash
   cd backend/lexinsight
   ./gradlew bootRun
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Environment Configuration**
   - Configure backend application properties in `backend/lexinsight/src/main/resources/application.properties`
   - Copy `frontend/example.env` to `.env` and configure your environment variables

## Project Structure

```
lexinsight/
├── backend/                  # Spring Boot backend
│   └── lexinsight/
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/    # Java source code
│       │   │   └── resources/ # Configuration files
│       │   └── test/        # Test files
│       └── build.gradle     # Gradle build configuration
│
└── frontend/                 # Next.js frontend application
    ├── src/
    │   ├── app/             # Next.js app router
    │   ├── components/      # React components
    │   ├── contexts/        # React contexts
    │   └── assets/          # Static assets
    └── public/              # Public assets
```

## API Documentation

The API documentation is available at `http://localhost:8080/swagger-ui.html` when running the backend server.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Google AI for providing the Generative AI capabilities
- The Spring Boot community for their excellent framework
- Legal professionals who contributed to the compliance-first approach
- All contributors who have helped shape this project

## Contact

For any queries or support, please reach out to the development team at [your-email@example.com](mailto:your-email@example.com)
