import React, { useState, useEffect } from 'react';
import SideNav from '../templates/SideNav';
import TopNav from '../templates/TopNav';
import axios from '../utils/axios';
import Header from '../templates/Header';
import HorizontalCards from '../templates/HorizontalCards';
import DropDown from '../templates/DropDown';
import Loading from '../templates/Loading';

function Home() {
    // FOR SHOW ALL DAY trending MOVIE
    const [wallpaper, setwallpaper] = useState(null);
    const [trendingCards, settrendingCards] = useState(null);
    const [categoryForDropDown, setcategoryForDropDown] = useState("all");

    const getHeaderWallpaper = async () => {
        try {
            const { data } = await axios.get(`trending/all/day`);
            // DATA.RESULTS MAI SE ANY RANDOM IMAGE 
            let Random = data.results[(Math.random() * data.results.length).toFixed()];
            setwallpaper(Random);
        } catch (error) {
            console.log(error);
        }
    }

    const gettrendingForCard = async () => {
        try {
            const { data } = await axios.get(`trending/${categoryForDropDown}/day`);
            settrendingCards(data.results);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        !wallpaper && getHeaderWallpaper();
        gettrendingForCard();
    }, [categoryForDropDown]); // jab jab category ki value change hogi tab-tab gettrending call hoga

    return wallpaper && trendingCards ? (
        <>
            <SideNav />


            <div className='w-full h-full overflow-auto max-h-screen flex flex-col md:flex-row bg-[#1F1E24]'>
                <div className='flex-grow md:w-[80%] h-full overflow-auto'>
                    <TopNav />
                    <Header data={wallpaper} />

                    <div className='flex justify-between p-6 '>
                        <h1 className='text-3xl font-semibold text-zinc-400 min-[90px]:text-[vw] '>Trending</h1>

                        {/* FOR DROP DOWN MENU */}
                       

                        <DropDown 
                            title="Filter" 
                            options={['tv', 'movie', 'all']} 
                            func={(e) => setcategoryForDropDown(e.target.value)} 
                            />
                           
                    </div>

                    <HorizontalCards data={trendingCards} />
                </div>
            </div>
        </>
    ) : <Loading />;
}

export default Home;