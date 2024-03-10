import { useEffect } from 'react';

const useDocTitle = (title) => {
    useEffect(() => {
        if (title) {
            document.title = `${title} - H2T-Coffee`;
        } else {
            document.title = 'H2T-Coffee | Cà phê Việt';
        }
    }, [title]);

    return null;
};

export default useDocTitle;
