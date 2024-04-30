
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNSharedStorageSpec.h"

@interface SharedStorage : NSObject <NativeSharedStorageSpec>
#else
#import <React/RCTBridgeModule.h>

@interface SharedStorage : NSObject <RCTBridgeModule>
#endif

@end
