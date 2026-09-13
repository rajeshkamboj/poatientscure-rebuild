# WordPress Setup for PatientScure (Phase 2)

This guide outlines the steps to set up a local WordPress instance for development, as per the decisions made in Phase 1.

## Decisions Recap
- **WordPress instance**: Local (for development)
- **Content types**: Custom post types (Disease, Remedy, Ingredient)
- **API accessibility**: Public (no authentication required)
- **Images & SEO**: Full integration (using Next.js Image and Yoast SEO or similar)

## Setup Steps

### 1. Install WordPress Locally
Choose one of the following methods:

#### Option A: Using LocalWP (Recommended for simplicity)
1. Download and install [LocalWP](https://localwp.com/).
2. Create a new site:
   - Site name: `patientscure` (or similar)
   - Environment: Preferred (or Custom)
   - WordPress version: Latest
3. Once the site is created, note the local URL (usually `http://patientscure.local` or `http://localhost:port`).

#### Option B: Using Docker
1. Ensure Docker is installed and running.
2. Use the following `docker-compose.yml` to start WordPress and MySQL:
   ```yaml
   version: '3.8'
   services:
     db:
       image: mysql:5.7
       volumes:
         - db_data:/var/lib/mysql
       restart: always
       environment:
         MYSQL_ROOT_PASSWORD: somewordpress
         MYSQL_DATABASE: wordpress
         MYSQL_USER: wordpress
         MYSQL_PASSWORD: wordpress
       ports:
         - "3306:3306"
     wordpress:
       depends_on:
         - db
       image: wordpress:latest
       ports:
         - "8080:80"
       restart: always
       environment:
         WORDPRESS_DB_HOST: db:3306
         WORDPRESS_DB_USER: wordpress
         WORDPRESS_DB_PASSWORD: wordpress
         WORDPRESS_DB_NAME: wordpress
   volumes:
     db_data:
   ```
3. Run `docker-compose up -d` in the directory containing the file.
4. WordPress will be available at `http://localhost:8080`.

#### Option C: Manual Installation
1. Download WordPress from [wordpress.org](https://wordpress.org/download/).
2. Extract the files to your local web server's document root (e.g., `htdocs` if using XAMPP/WAMP).
3. Create a MySQL database and user for WordPress.
4. Run the WordPress installation script by accessing the site in a browser.

### 2. Configure WordPress for Development
After installing WordPress:
- Log in to the WordPress admin dashboard.
- Go to **Settings > Permalinks** and set the permalink structure to "Post name" (or custom structure that works with REST API).
- Ensure the site is accessible via the REST API at `http://your-local-site/wp-json/`. Test by visiting `http://your-local-site/wp-json/wp/v2/posts` (should return a JSON response).

### 3. Create Custom Post Types
We need three custom post types: `disease`, `remedy`, `ingredient`.

You can create them using a plugin or by adding code to your theme's `functions.php`.

#### Using a Plugin (Recommended)
Install and activate a plugin like [Custom Post Type UI](https://wordpress.org/plugins/custom-post-type-ui/) or [Toolset Types](https://toolset.com/).

Then create the following post types:

| Post Type | Slug (optional) | Description |
|-----------|----------------|-------------|
| Disease   | disease        | For diseases/conditions |
| Remedy    | remedy         | For home remedies/treatments |
| Ingredient| ingredient     | For natural ingredients/herbs |

#### Using Code
Add the following to your theme's `functions.php` or a custom plugin:

```php
function patientscure_register_post_types() {
    // Disease
    register_post_type('disease', [
        'label' => __('Diseases', 'patientscure'),
        'labels' => [
            'name' => __('Diseases', 'patientscure'),
            'singular_name' => __('Disease', 'patientscure'),
        ],
        'public' => true,
        'show_in_rest' => true,
        'rest_base' => 'disease',
        'rest_controller_class' => 'WP_REST_Posts_Controller',
        'has_archive' => true,
        'supports' => ['title', 'editor', 'excerpt', 'thumbnail'],
    ]);

    // Remedy
    register_post_type('remedy', [
        'label' => __('Remedies', 'patientscure'),
        'labels' => [
            'name' => __('Remedies', 'patientscure'),
            'singular_name' => __('Remedy', 'patientscure'),
        ],
        'public' => true,
        'show_in_rest' => true,
        'rest_base' => 'remedy',
        'rest_controller_class' => 'WP_REST_Posts_Controller',
        'has_archive' => true,
        'supports' => ['title', 'editor', 'excerpt', 'thumbnail'],
    ]);

    // Ingredient
    register_post_type('ingredient', [
        'label' => __('Ingredients', 'patientscure'),
        'labels' => [
            'name' => __('Ingredients', 'patientscure'),
            'singular_name' => __('Ingredient', 'patientscure'),
        ],
        'public' => true,
        'show_in_rest' => true,
        'rest_base' => 'ingredient',
        'rest_controller_class' => 'WP_REST_Posts_Controller',
        'has_archive' => true,
        'supports' => ['title', 'editor', 'excerpt', 'thumbnail'],
    ]);
}
add_action('init', 'patientscure_register_post_types');
```

### 4. Add Custom Fields (ACF)
To store the structured data required by our TypeScript interfaces, we need to add custom fields to each post type.

Install and activate the [Advanced Custom Fields (ACF)](https://wordpress.org/plugins/advanced-custom-fields/) plugin (free version is sufficient).

Then create field groups for each post type as per the interfaces in `lib/mockData.ts`.

#### Disease Fields (matching Disease interface)
- **common_names** (Text Array): Common names for the disease.
- **summary** (Textarea): Brief summary of the disease.
- **last_updated** (Date): Date of last update.
- **author** (Text): Author name.
- **reviewer** (Text): Reviewer name.
- **quick_info** (Group):
  - prevalence (Text)
  - age_group (Text)
  - gender (Text)
- **symptoms** (Repeater or Text Array): List of symptoms.
- **causes** (Repeater or Text Array): List of causes.
- **ayurvedic_perspective** (Textarea): Ayurvedic view of the disease.
- **desi_nuskhe** (Repeater): Each repeater item contains:
  - name (Text)
  - purpose (Text)
  - ingredients (Repeater within repeater: item (Text), quantity (Text))
  - preparation (Textarea)
  - how_to_use (Textarea)
  - timing (Text)
  - frequency (Text)
  - duration (Text)
  - precautions (Repeater or Text Array)
  - who_should_avoid (Repeater or Text Array)
- **diet** (Repeater or Text Array): Dietary recommendations.
- **lifestyle** (Repeater or Text Array): Lifestyle recommendations.
- **precautions** (Repeater or Text Array): General precautions.
- **when_to_seek_medical_care** (Textarea): Guidance on when to see a doctor.
- **faq** (Repeater): Each item contains:
  - question (Text)
  - answer (Textarea)
- **references** (Repeater or Text Array): References/sources.
- **related_diseases** (Relationship): Related disease posts.
- **related_remedies** (Relationship): Related remedy posts.
- **related_ingredients** (Relationship): Related ingredient posts.

#### Remedy Fields (matching Remedy interface)
- **purpose** (Textarea): What the remedy is used for.
- **ingredients** (Repeater): Each item contains:
  - item (Text)
  - quantity (Text)
- **preparation** (Textarea): How to prepare the remedy.
- **how_to_use** (Textarea): Instructions on how to use the remedy.
- **timing** (Text): Best time of day to take.
- **frequency** (Text): How often to take.
- **duration** (Text): How long to take the remedy.
- **precautions** (Repeater or Text Array): Precautions for this remedy.
- **who_should_avoid** (Repeater or Text Array): Who should avoid this remedy.
- **references** (Repeater or Text Array): References/sources.

#### Ingredient Fields (matching Ingredient interface)
- **common_names** (Text Array): Other names for the ingredient.
- **hindi_name** (Text): Name in Hindi.
- **punjabi_name** (Text): Name in Punjabi.
- **description** (Textarea): Description of the ingredient.
- **traditional_uses** (Repeater or Text Array): Traditional uses.
- **preparation** (Repeater or Text Array): Preparation methods (e.g., tea, powder, paste).
- **precautions** (Repeater or Text Array): Precautions when using this ingredient.
- **related_remedies** (Relationship): Related remedy posts.
- **related_diseases** (Relationship): Related disease posts.

### 5. Ensure REST API is Public
By default, the WordPress REST API is public if the site is public. Since we are developing locally, we don't need authentication.

Test the API endpoints:
- Diseases: `http://your-local-site/wp-json/wp/v2/disease`
- Remedies: `http://your-local-site/wp-json/wp/v2/remedy`
- Ingredients: `http://your-local-site/wp-json/wp/v2/ingredient`

You should see an empty array `[]` if no posts are created yet.

### 6. Populate with Sample Data (Optional)
Create a few sample posts for each custom post type to test the integration.

### 7. Switch to WordPress API in the Next.js App
Once your WordPress instance is running and the API is accessible, update the environment variable in `.env.local`:

```env
NEXT_PUBLIC_USE_MOCK_DATA=false
```

Keep the `NEXT_PUBLIC_WP_API_URL` pointing to your local WordPress instance (e.g., `http://localhost:8080/wp-json` or `http://patientscure.local/wp-json`).

Then restart the Next.js development server:
```bash
npm run dev
```

The app should now fetch data from your WordPress instance instead of using mock data.

### 8. Image and SEO Integration (Future Work)
For full integration of images and SEO as per the decision:
- Use [Yoast SEO](https://wordpress.org/plugins/wordpress-seo/) or similar to generate SEO metadata.
- Map SEO fields (title, description) to the Next.js `Head` component.
- Use the WordPress media library for images and integrate with Next.js Image component for optimization.
- This may require extending the REST API responses to include image URLs and SEO data, or using GraphQL (e.g., with WPGraphQL) for more efficient data fetching.

## Troubleshooting
- If the API returns CORS errors, ensure your WordPress instance is accessible from the Next.js dev server (usually running on `localhost:3000`). You may need to adjust WordPress settings or use a proxy during development.
- If you see empty data, verify that you have published posts of the custom post types and that the ACF fields are filled.
- Check the browser console and Next.js server logs for errors.

## Notes
- The mapping functions in `lib/wordpress/service.ts` are already set up to expect the ACF field names as specified above. Adjust the mapping if you use different field names.
- The Next.js app uses Server Components for data fetching, which provides excellent performance and SEO benefits.

## Next Steps After Setup
1. Verify that the data loads correctly from WordPress in the Next.js app.
2. Refine the mapping functions if necessary to match your actual WP API response structure.
3. Optimize image loading using Next.js Image component.
4. Add SEO metadata using data from Yoast SEO or similar.