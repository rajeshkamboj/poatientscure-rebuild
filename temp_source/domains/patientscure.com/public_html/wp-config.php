<?php
define( 'WP_CACHE', true );

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'u228322850_mRE9B' );

/** Database username */
define( 'DB_USER', 'u228322850_ZIyGr' );

/** Database password */
define( 'DB_PASSWORD', 'z3TG2bMpHy' );

/** Database hostname */
define( 'DB_HOST', '127.0.0.1' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          '_`fIf+$T(j>;Ri5Dm`jwZ4Z7<D0# y 70UT;V_F|<E`kC_q$G$7%%$B+B%I*~uoJ' );
define( 'SECURE_AUTH_KEY',   'piF#*O%V8x7bt7R]K~$G%f*tka;-v!Dkj%;hD!$^^5?nk;V&r2EiSzwKY$GMr`Uu' );
define( 'LOGGED_IN_KEY',     'PJ|o9n?_QS|bUbv1b+>bkY~ztmp4*aV/>L!G~<nlElG`qr>9b#SWIsTw;Q}.[&Ou' );
define( 'NONCE_KEY',         'Ia6Z)bS6s ZMh~;p&wL) j~dHV2?h<gO&b6p+U=m?!W(|h0~@P9&jZd->-9<_XxY' );
define( 'AUTH_SALT',         ' 2Rp5N,O+3W7a%DFtsm]KM~J>ZemH(WRfEjvnRx)yg}X%{ya0:{)uR,T]x4CJw<|' );
define( 'SECURE_AUTH_SALT',  'F8QTq+SDunDK1hKP[NFZXQ31N=CwHnT3lgm]xWp6mD8txVd,1p4}DUi&,PJjpz$=' );
define( 'LOGGED_IN_SALT',    '<L.7@qGO$KXwZAMXsQ,b=ms)kJ!`dDa##)Qagt>7/>6kJ$]~:dW+(JhyJO&sh3Fx' );
define( 'NONCE_SALT',        'vZ`?&Y~ZiHFw{Q;Pd;u7*^PA4yzL`GxH0;kwE>=~T 8W?j|ZvSUud@1W$7bpR6l/' );
define( 'WP_CACHE_KEY_SALT', ' `+`+i$BBghId@+eHW1I}&AHpo;ca#]f0 }~H)2_L`PZL23YViIJZ]cTX{m?1f3(' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'FS_METHOD', 'direct' );
define( 'COOKIEHASH', '52c651f27f15be46bf5d98ddb6df1093' );
define( 'WP_AUTO_UPDATE_CORE', 'minor' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
