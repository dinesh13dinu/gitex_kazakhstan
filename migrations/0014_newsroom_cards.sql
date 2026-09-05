UPDATE news_posts SET
 title='News Digest: Foreign Media on Kazakhstan’s Reform Drive, Investment Push, and Human Stories',
 cover_url='https://www.gitexcac.com/Uploads//Posts/NewsFeed/News_Digest_img.jpg',
 published_at='2026-08-20T09:00:00Z'
WHERE slug='gitex-ai-kazakhstan-returns' AND locale='en';

UPDATE news_posts SET
 title='На полях GITEX AI Kazakhstan подписан трехсторонний меморандум о создании «Долины ЦОДов» Казахстан строит экономику ИИ-токенов',
 cover_url='https://www.gitexcac.com/Uploads//Posts/NewsFeed/gluster_2026_5_5_img.jpg',
 published_at='2026-07-14T09:00:00Z'
WHERE slug='ai-ecosystem' AND locale='en';

UPDATE news_posts SET
 title='Astana Hub и zypl объединят усилия для развития AI-финансирования стартапов',
 cover_url='https://www.gitexcac.com/Uploads//Posts/NewsFeed/gluster_2026_5_5_img2.jpg',
 published_at='2026-06-30T09:00:00Z'
WHERE slug='investor-programme-2027' AND locale='en';

INSERT OR REPLACE INTO news_posts(slug,locale,title,excerpt,body_md,cover_url,published_at,seo_json) VALUES
('central-asia-venture-market-may-2026','en','Главные новости венчурного рынка Центральной Азии — май 2026','A round-up of the latest venture-market developments across Central Asia.','# Central Asia venture market — May 2026','https://www.gitexcac.com/Uploads//Posts/NewsFeed/img_2963-1.jpg','2026-06-15T09:00:00Z','{}');

UPDATE news_posts SET cover_url='https://www.gitexcac.com/Uploads//Posts/NewsFeed/News_Digest_img.jpg' WHERE locale='ru' AND slug='gitex-ai-kazakhstan-returns';
UPDATE news_posts SET cover_url='https://www.gitexcac.com/Uploads//Posts/NewsFeed/gluster_2026_5_5_img.jpg' WHERE locale='ru' AND slug='ai-ecosystem';
UPDATE news_posts SET cover_url='https://www.gitexcac.com/Uploads//Posts/NewsFeed/gluster_2026_5_5_img2.jpg' WHERE locale='ru' AND slug='investor-programme-2027';
INSERT OR REPLACE INTO news_posts(slug,locale,title,excerpt,body_md,cover_url,published_at,seo_json) VALUES
('central-asia-venture-market-may-2026','ru','Главные новости венчурного рынка Центральной Азии — май 2026','Обзор последних событий венчурного рынка Центральной Азии.','# Венчурный рынок Центральной Азии — май 2026','https://www.gitexcac.com/Uploads//Posts/NewsFeed/img_2963-1.jpg','2026-06-15T09:00:00Z','{}');
