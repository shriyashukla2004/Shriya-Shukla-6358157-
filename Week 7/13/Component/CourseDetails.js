import React, { useState, useEffect, useMemo } from 'react';

const CourseDetails = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userLevel, setUserLevel] = useState('beginner'); // beginner, intermediate, advanced
  const [showCompleted, setShowCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const sampleCourses = [
    { 
      id: 1, 
      name: 'Angular', 
      date: '4/5/2021', 
      level: 'intermediate',
      duration: '8 weeks',
      instructor: 'John Doe',
      price: 299,
      maxStudents: 50,
      enrolledStudents: 35,
      isCompleted: false
    },
    { 
      id: 2, 
      name: 'React', 
      date: '6/3/2021', 
      level: 'beginner',
      duration: '10 weeks',
      instructor: 'Jane Smith',
      price: 399,
      maxStudents: 40,
      enrolledStudents: 40,
      isCompleted: true
    },
    { 
      id: 3, 
      name: 'Vue.js Advanced', 
      date: '8/15/2021', 
      level: 'advanced',
      duration: '6 weeks',
      instructor: 'Mike Johnson',
      price: 499,
      maxStudents: 30,
      enrolledStudents: 15,
      isCompleted: false
    },
    { 
      id: 4, 
      name: 'JavaScript Fundamentals', 
      date: '9/1/2021', 
      level: 'beginner',
      duration: '12 weeks',
      instructor: 'Sarah Wilson',
      price: 199,
      maxStudents: 60,
      enrolledStudents: 45,
      isCompleted: false
    }
  ];

  useEffect(() => {
    // Simulate API call with error handling
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulate random error (10% chance)
        if (Math.random() < 0.1) {
          throw new Error('Failed to fetch courses');
        }
        
        setCourses(sampleCourses);
        setEnrolledCourses([1, 3]); // User is enrolled in courses with IDs 1 and 3
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Method 1: Custom hook-like pattern for conditional rendering - moved to component level
  const courseFilters = useMemo(() => {
    const filteredCourses = courses.filter(course => {
      const levelMatch = userLevel === 'all' || course.level === userLevel;
      const completionMatch = showCompleted ? course.isCompleted : !course.isCompleted;
      return levelMatch && completionMatch;
    });

    return {
      filteredCourses,
      hasCourses: filteredCourses.length > 0,
      totalCourses: courses.length
    };
  }, [courses, userLevel, showCompleted]);

  // Method 2: Computed properties at component level
  const courseStats = useMemo(() => {
    const totalCourses = courses.length;
    const availableCourses = courses.filter(course => 
      course.enrolledStudents < course.maxStudents
    ).length;
    const completedCourses = courses.filter(course => course.isCompleted).length;
    const totalEnrollment = courses.reduce((sum, course) => sum + course.enrolledStudents, 0);

    return { totalCourses, availableCourses, completedCourses, totalEnrollment };
  }, [courses]);

  // Method 3: Level-based recommendations at component level
  const recommendations = useMemo(() => {
    const userCourses = courses.filter(course => enrolledCourses.includes(course.id));
    const userLevels = userCourses.map(course => course.level);
    
    if (userLevels.includes('advanced')) {
      return courses.filter(course => course.level === 'advanced' && !enrolledCourses.includes(course.id));
    } else if (userLevels.includes('intermediate')) {
      return courses.filter(course => course.level === 'intermediate' && !enrolledCourses.includes(course.id));
    } else {
      return courses.filter(course => course.level === 'beginner' && !enrolledCourses.includes(course.id));
    }
  }, [courses, enrolledCourses]);

  // Method 4: Conditional rendering with error handling
  const renderErrorBoundary = () => {
    if (error) {
      return (
        <div className="error-container">
          <h3>Error Loading Courses</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      );
    }
    return null;
  };

  // Method 5: Conditional rendering with loading states
  const renderLoadingState = () => {
    if (isLoading) {
      return (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading courses...</p>
        </div>
      );
    }
    return null;
  };

  // Method 6: Conditional rendering with enrollment status
  const renderCourseCard = (course) => {
    const isEnrolled = enrolledCourses.includes(course.id);
    const isFull = course.enrolledStudents >= course.maxStudents;
    const enrollmentPercentage = (course.enrolledStudents / course.maxStudents) * 100;

    return (
      <div key={course.id} className={`course-card ${isEnrolled ? 'enrolled' : ''}`}>
        <h3>{course.name}</h3>
        <p><strong>Date:</strong> {course.date}</p>
        <p><strong>Level:</strong> {course.level}</p>
        <p><strong>Duration:</strong> {course.duration}</p>
        <p><strong>Instructor:</strong> {course.instructor}</p>
        <p><strong>Price:</strong> ${course.price}</p>
        
        {/* Method 7: Conditional rendering based on enrollment status */}
        {isEnrolled ? (
          <div className="enrollment-status">
            <span className="enrolled-badge">Enrolled</span>
            {course.isCompleted && <span className="completed-badge">Completed</span>}
          </div>
        ) : (
          <div className="enrollment-actions">
            {isFull ? (
              <span className="full-badge">Course Full</span>
            ) : (
              <button onClick={() => handleEnroll(course.id)}>Enroll Now</button>
            )}
          </div>
        )}
        
        {/* Method 8: Conditional rendering with progress indicators */}
        <div className="enrollment-progress">
          <p>Enrollment: {course.enrolledStudents}/{course.maxStudents}</p>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${enrollmentPercentage}%` }}
            ></div>
          </div>
          {enrollmentPercentage > 80 && <p className="almost-full">Almost Full!</p>}
        </div>
      </div>
    );
  };

  // Method 9: Conditional rendering with computed properties (now using pre-computed stats)
  const renderCourseStats = () => {
    return (
      <div className="course-stats">
        <h3>Course Statistics</h3>
        <p>Total Courses: {courseStats.totalCourses}</p>
        <p>Available Courses: {courseStats.availableCourses}</p>
        <p>Completed Courses: {courseStats.completedCourses}</p>
        <p>Total Enrollments: {courseStats.totalEnrollment}</p>
        
        {/* Method 10: Conditional rendering with multiple conditions */}
        {courseStats.availableCourses === 0 && <p className="no-availability">No courses available</p>}
        {courseStats.completedCourses > courseStats.totalCourses / 2 && <p className="high-completion">High completion rate!</p>}
        {courseStats.totalEnrollment > 100 && <p className="popular-platform">Popular learning platform</p>}
      </div>
    );
  };

  // Method 11: Conditional rendering with level-based recommendations (now using pre-computed recommendations)
  const renderRecommendations = () => {
    return recommendations.length > 0 ? (
      <div className="recommendations">
        <h3>Recommended for You</h3>
        {recommendations.slice(0, 3).map(course => (
          <div key={course.id} className="recommendation-item">
            <h4>{course.name}</h4>
            <p>{course.level} level • {course.duration}</p>
          </div>
        ))}
      </div>
    ) : null;
  };

  // Method 12: Conditional rendering with filters
  const renderFilters = () => {
    const levels = ['all', 'beginner', 'intermediate', 'advanced'];
    
    return (
      <div className="course-filters">
        <div className="level-filter">
          <label>Filter by Level: </label>
          <select value={userLevel} onChange={(e) => setUserLevel(e.target.value)}>
            {levels.map(level => (
              <option key={level} value={level}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        <div className="completion-filter">
          <label>
            <input 
              type="checkbox" 
              checked={showCompleted} 
              onChange={(e) => setShowCompleted(e.target.checked)}
            />
            Show Completed Courses
          </label>
        </div>
      </div>
    );
  };

  const handleEnroll = (courseId) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses([...enrolledCourses, courseId]);
    }
  };

  const { filteredCourses, hasCourses } = courseFilters;

  return (
    <div className="course-details">
      <h2>Course Details</h2>
      
      {renderErrorBoundary()}
      {renderLoadingState()}
      
      {!error && !isLoading && (
        <>
          {renderFilters()}
          {renderCourseStats()}
          
          <div className="courses-container">
            {hasCourses ? (
              <div className="course-grid">
                {filteredCourses.map(renderCourseCard)}
              </div>
            ) : (
              <p>No courses match your current filters</p>
            )}
          </div>
          
          {renderRecommendations()}
        </>
      )}
    </div>
  );
};

export default CourseDetails; 