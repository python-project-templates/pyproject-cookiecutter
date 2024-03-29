/******************************************************************************
 *
 * Copyright (c) 2017, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

#pragma once

#ifdef WIN32
#ifdef LIB_EXPORTS
#define LIB_EXPORT __declspec(dllexport)
#else
#define LIB_EXPORT __declspec(dllimport)
#endif
#else
#define LIB_EXPORT __attribute__((visibility("default")))
#endif

#ifdef WIN32
#ifdef LIB_EXPORTS
#ifdef PSP_MPROTECT
#define LIB_MPROTECT_EXPORT __declspec(dllexport, align(4096))
#else
#define LIB_MPROTECT_EXPORT __declspec(dllexport)
#endif // mprotect

#else
#ifdef PSP_MPROTECT
#define LIB_MPROTECT_EXPORT __declspec(dllimport, align(4096))
#else
#define LIB_MPROTECT_EXPORT __declspec(dllimport)
#endif // mprotect
#endif // exports
#else
#define LIB_MPROTECT_EXPORT __attribute__((visibility("default")))
#endif // win32
