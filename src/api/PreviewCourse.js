import profile_img from '../assets/images/profile_img.png';
import Poster from '../assets/images/poster.png';
import pick_img1 from '../assets/images/tick_mark.png';

const PreviewCourse={
    "profile_img":profile_img,
    "updated":' Uploaded on December 04 2022',
    
    "content":[
        {   
            "id":1,
            "lesson":'Lesson 1',
            "checkmark":pick_img1,
            "lessons":[{
                "id":1,
                "file":'Lesson.mp4 Lesson.mp4 Lesson.mp4 Lesson.mp4 Lesson.mp4',
                "poster":Poster,
                "checkmark":pick_img1
                },
                {
                    "id":2,
                    "file":'Lesson2.mp4',
                    "poster":Poster,
                    "checkmark":pick_img1
                },
                {
                    "id":3,
                    "file":'Lesson3.mp4',
                    "poster":Poster,
                    "checkmark":pick_img1
                },
                {
                    "id":4,
                    "file":'Lesson3.mp4',
                    "poster":Poster,
                    "checkmark":pick_img1
                },
            ]
            
        },
        {   
            "id":2,
            "lesson":'Lesson 2',
            "checkmark":pick_img1,
            "lessons":[
                {
                "id":1,
                "file":'Lesson.mp4',
                "poster":Poster,
                "checkmark":pick_img1
                },
                {
                "id":2,
                "file":'Lesson.mp4',
                "poster":Poster,
                "checkmark":pick_img1
                },
            ]
        },
        {   
            "id":3,
            "lesson":'Lesson 3',
            "checkmark":pick_img1,
            "lessons":[{
                "id":1,
                "file":'Lesson.mp4',
                "poster":Poster,
                "checkmark":pick_img1
                }
            ]
        }
    ]
}
export default PreviewCourse