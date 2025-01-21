import { home, about, blog, contact, classes, teachers, categories, users } from './content';

const renderContent = (t) => {
    return {
        home,
        about,
        blog,
        contact,
        classes,
        teachers,
        categories,
        users
    }
};

export { renderContent };