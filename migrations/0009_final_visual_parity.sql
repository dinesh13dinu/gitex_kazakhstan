ALTER TABLE testimonials ADD COLUMN image_url TEXT;
UPDATE stats SET value='12283' WHERE sort_order=1;
UPDATE stats SET value='334' WHERE sort_order=2;
UPDATE stats SET value='3499' WHERE sort_order=3;
UPDATE stats SET value='150' WHERE sort_order=4;
UPDATE stats SET value='86' WHERE sort_order=5;
UPDATE testimonials SET image_url='https://www.gitexcac.com/images/testimonial_img01.png',logo_url='https://www.gitexcac.com/images/HW_POS_RGB.png' WHERE sort_order=1;
UPDATE testimonials SET image_url='https://www.gitexcac.com/images/testimonial_img02.png',logo_url='https://www.gitexcac.com/images/H3C-up.png' WHERE sort_order=2;
INSERT INTO testimonials(quote_en,quote_ru,name_en,name_ru,role_en,role_ru,company_en,company_ru,logo_url,sort_order,image_url) VALUES
('Participation in GITEX AI Kazakhstan provides opportunities to connect with strong partners, showcase our solutions to an international audience, and accelerate innovation across the region.','Участие в GITEX AI Kazakhstan помогает находить сильных партнёров, представлять наши решения международной аудитории и ускорять инновации во всём регионе.','Oleksii Sharavar','Алексей Шаравар','Chief Executive Officer','Генеральный директор','QazCode','QazCode','https://www.gitexcac.com/Uploads//Posts/_QazCode.png.png',3,'https://www.gitexcac.com/images/testimonial_img02.png'),
('GITEX AI Kazakhstan is a strategic platform to engage with industry stakeholders, showcase AI-driven solutions, and advance industrial intelligence across the region.','GITEX AI Kazakhstan — стратегическая площадка для общения с лидерами отрасли, демонстрации решений на базе ИИ и развития промышленного интеллекта в регионе.','Huawei Kazakhstan','Huawei Казахстан','Technology Partner','Технологический партнёр','Huawei','Huawei','https://www.gitexcac.com/images/HW_POS_RGB.png',4,'https://www.gitexcac.com/images/testimonial_img01.png');
