import React, { createContext, useContext, useEffect, useState } from 'react';

const API_URL = 'https://v1.codeclub.workers.dev';

interface PageViewsContextType {
    pageViews: number;
    members: string;
    refreshPageViews: () => void;
}

const PageViewsContext = createContext<PageViewsContextType | undefined>(undefined);

export const usePageViews = () => {
    const context = useContext(PageViewsContext);
    if (context === undefined) {
        throw new Error('usePageViews must be used within a PageViewsProvider');
    }
    return context;
};

export const PageViewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [pageViews, setPageViews] = useState<number>(0);
    const members = "100+";

    const fetchPageViews = async () => {
        try {
            const response = await fetch(`${API_URL}/page-views/count`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            if (typeof data.count === 'number') {
                setPageViews(data.count);
            }
        } catch (error) {
            console.error('Error fetching page views:', error);
        }
    };

    useEffect(() => {
        const incrementAndFetchPageViews = async () => {
            try {
                const hasIncremented = sessionStorage.getItem('pageViewIncremented');

                if (!hasIncremented) {
                    await fetch(`${API_URL}/page-views/increment`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                    });
                    sessionStorage.setItem('pageViewIncremented', 'true');
                }
                
                fetchPageViews();

            } catch (error) {
                console.error('Error updating/fetching page views:', error);
            }
        };

        incrementAndFetchPageViews();
    }, []);

    return (
        <PageViewsContext.Provider value={{ pageViews, members, refreshPageViews: fetchPageViews }}>
            {children}
        </PageViewsContext.Provider>
    );
};
