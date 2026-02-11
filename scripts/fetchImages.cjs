const fs = require('fs');
const https = require('https');
const path = require('path');

// Official Tokyo Toilet main image pattern seems to be:
// https://tokyotoilet.jp/wp/wp-content/uploads/2021/04/hatagaya_main.jpg
// https://tokyotoilet.jp/wp/wp-content/uploads/2023/04/nishisando_main.jpg
// Let's try to map our IDs to these likely filenames.
// The site uses YYYY/MM folders which change per toilet launch date.
// I will try a few known good URLs from search results first.

const imagesToFetch = [
    // 1. Sou Fujimoto (Nishisando) - ID in code is sasazuka-greenway but description matches Sou Fujimoto? 
    // Wait, search said Sasazuka is Junko Kobayashi. Sou Fujimoto is Nishisando.
    // The code has ID: sasazuka-greenway, Architect: Sou Fujimoto. This data might be mixed up!
    // I will fetch images based on the ARCHITECT NAME in the file, or the likely real URL.

    // Real URLs found or constructed:
    {
        localName: 'sou-fujimoto-tokyo-toilet_dezeen_2364_sq_1.jpg',
        url: 'https://tokyotoilet.jp/wp/wp-content/uploads/2023/04/nishisando_main.jpg'
    },
    {
        localName: 'kashiwa-sato-tokyo-toilet-ebisu-station_dezeen_2364_sq_3.jpg',
        url: 'https://tokyotoilet.jp/wp/wp-content/uploads/2021/07/ebisu_west_main.jpg' // Guess based on pattern
    },
    {
        localName: 'modern-kawaya-wonderwall-sq-1704x1704.jpg',
        url: 'https://tokyotoilet.jp/wp/wp-content/uploads/2020/07/ebisu_p_ex_02.jpg' // Confirmed from search
    },
    {
        localName: 'shigeru-ban-transparent-tokyo-toilet-yo-yogi-fukamachi-park-haru-no-ogawa_dezeen_2364_sq_24.jpg',
        url: 'https://tokyotoilet.jp/wp/wp-content/uploads/2020/08/yoyogifukamachi_main.jpg'
    },
    {
        localName: 'toilet-shigeru-ban-sq-1704x1704.jpg',
        url: 'https://tokyotoilet.jp/wp/wp-content/uploads/2020/08/harunoogawa_main.jpg'
    },
    {
        localName: 'toyo-ito-tokyo-toilet-shibuya-yoyogi-hachiman-tiles_dezeen_2364_sq_77.jpg',
        url: 'https://tokyotoilet.jp/wp/wp-content/uploads/2021/07/yoyogihachiman_main.jpg'
    },
    {
        localName: 'tadao-ando-tokyo-toilet-project-jingu-dori-park_dezeen_2364_sq_2.jpg',
        url: 'https://tokyotoilet.jp/wp/wp-content/uploads/2020/09/jingudori_main.jpg'
    },
    {
        localName: 'fumihiko-maki-tokyo-toilet-project-ebisu-east-park_dezeen_2364_sq_3.jpg',
        url: 'https://tokyotoilet.jp/wp/wp-content/uploads/2020/08/ebisuhigashi_main.jpg'
    },
    {
        localName: 'kengo-kuma-tokyo-toilet-wood_dezeen_2364_hero_9.jpg',
        url: 'https://tokyotoilet.jp/wp/wp-content/uploads/2021/06/nabeshimashoto_main.jpg'
    },
    {
        localName: 'nigo-tokyo-toilet-harajuku-house-shaped_dezeen_2364_sq_9.jpg',
        url: 'https://tokyotoilet.jp/wp/wp-content/uploads/2021/05/jingumae_main.jpg'
    },
    {
        localName: 'nao-tamura-triangle-toilet-shibuya-tokyo-japan_dezeen_2364_sq_3.jpg',
        url: 'https://tokyotoilet.jp/wp/wp-content/uploads/2020/08/higashisanchome_main.jpg'
    },
    {
        localName: 'tomohito-ushiro-tokyo-toilet-project-hiroo-east-park-2_dezeen_2364_sq_3.jpg',
        url: 'https://tokyotoilet.jp/wp/wp-content/uploads/2022/07/hiroohigashi_main.jpg'
    },
    {
        localName: 'takenosuke-sakakura-tokyo-toilet-project-nishihara-itchome-park_dezeen_2364_sq_3.jpg',
        url: 'https://tokyotoilet.jp/wp/wp-content/uploads/2020/08/nishiharaitchome_main.jpg'
    },
    {
        localName: 'miles-pennington-hatagaya-tokyo-toilet-project_dezeen_2364_sq_2.jpg',
        url: 'https://tokyotoilet.jp/wp/wp-content/uploads/2023/02/hatagaya_main.jpg'
    },
    {
        localName: 'kazoo-sato-spherical-tokyo-toilet-project_dezeen_2364_sq_5.jpg',
        url: 'https://tokyotoilet.jp/wp/wp-content/uploads/2021/08/nanagodori_main.jpg'
    },
    {
        localName: 'junko-kobayashi-tokyo-toilet-cylindrical_dezeen_2364_sq_0.jpg',
        url: 'https://tokyotoilet.jp/wp/wp-content/uploads/2023/03/sasazuka_main.jpg'
    },
    {
        localName: 'marc-newson-tokyo-toilet-sq-1704x1704.jpg',
        url: 'https://tokyotoilet.jp/wp/wp-content/uploads/2023/01/urasando_main.jpg'
    }
];

const publicDir = path.join(__dirname, '../public');

async function downloadImage(url, filename) {
    const filepath = path.join(publicDir, filename);

    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                // Try fallback if main fails? Start with basic attempt.
                res.resume();
                resolve({ success: false, status: res.statusCode, url });
                return;
            }

            const stream = fs.createWriteStream(filepath);
            res.pipe(stream);

            stream.on('finish', () => {
                stream.close();
                resolve({ success: true, filepath });
            });
        }).on('error', (err) => {
            resolve({ success: false, error: err.message });
        });
    });
}

async function main() {
    console.log("Starting image downloads...");
    let successCount = 0;

    for (const img of imagesToFetch) {
        console.log(`Downloading ${img.localName}...`);
        const result = await downloadImage(img.url, img.localName);
        if (result.success) {
            console.log(`✅ Success: ${img.localName}`);
            successCount++;
        } else {
            console.log(`❌ Failed: ${img.localName} (Status: ${result.status || result.error})`);
            // Attempt a backup generic "not found" or keep existing file?
            // Existing file is corrupt anyway.
        }
    }

    console.log(`\nFinished! ${successCount}/${imagesToFetch.length} images downloaded.`);
}

main();
